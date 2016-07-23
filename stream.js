const util = require('util');
const Stream = require('stream');

const makeHeader = require('./').makeHeader

function ConvertStream(options) {
  if (!(this instanceof ConvertStream))
    return new ConvertStream(options);
  this.encoded = true && options.encoded !== false;
  this.charset = options.charset;
  this.mimetype = options.mimetype;
  this.header = makeHeader(options);
  this.headerEmitted = false;
  this.readable = true;
  this.writable = true;
  this._buffer = Buffer(0);
  this.once('pipe', function (src) {
    this.pause = src.pause.bind(src);
    this.resume = src.resume.bind(src);
  }.bind(this));
}

util.inherits(ConvertStream, Stream);

ConvertStream.prototype._emit = Stream.prototype.emit;
ConvertStream.prototype.emitData = function emitData(data) {
  if (!this.headerEmitted) {
    this.emit('data', this.header);
    this.headerEmitted = true;
    this.emitData = this.emit.bind(this, 'data');
  }
  this.emit('data', data);
};
ConvertStream.prototype.convert = function convert(data) {
  if (!this.encoded)
    return data;
  data = Buffer.concat([this._buffer, Buffer(data)]);
  if (data.length < 3) {
    this._buffer = data;
    return;
  }
  const length = data.length;
  const remainderSize = length % 3;
  const offset = length - remainderSize;
  const current = data.slice(0, offset);
  this._buffer = data.slice(offset);
  return current.toString('base64');
};
ConvertStream.prototype.finish = function finish() {
  const data = this._buffer;
  if (!data.length)
    return;
  return this.emitData(
    this.encoded ? data.toString('base64') : data
  );
};
ConvertStream.prototype.write = function write(data) {
  var output = this.convert(data);
  if (output)
    this.emitData(output);
};
ConvertStream.prototype.end = function end(data) {
  if (data)
    this.write(data);
  this.finish();
  this.readable = false;
  this.writable = false;
  this.emit('end');
};

module.exports = function (options) {
  return new ConvertStream(options);
};


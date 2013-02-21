const REGEX = {
  dataurl: /data:(.*?)(?:;charset=(.*?))?(;base64),(.+)/i,
  newlines: /(\r)|(\n)/g
}
const MIME_INDEX = 1;
const CHARSET_INDEX = 2;
const ENCODED_INDEX = 3;
const DATA_INDEX = 4;

function dataurl() {}

function stripNewlines(string) {
  return string.replace(REGEX.newlines, '');
}

function isString(thing) {
  return typeof thing === 'string';
}

dataurl.parse = function (string) {
  var match;
  if (!isString(string))
    return false;
  string = stripNewlines(string);
  if (!(match = REGEX.dataurl.exec(string)))
    return false;
  const encoded = !!match[ENCODED_INDEX];
  const base64 = (encoded ? 'base64' : null);
  const data = Buffer(match[DATA_INDEX], base64);
  return {
    mime: match[MIME_INDEX],
    charset: match[CHARSET_INDEX],
    data: data,
  }
};

module.exports = dataurl;
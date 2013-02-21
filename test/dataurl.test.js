const test = require('tap').test;
const dataurl = require('../');
const fs = require('fs');

const TEST_FILE = fs.readFileSync(__dirname + '/reddot.png');
const TEST_DATAURL = 'data:image/png;base64,'+TEST_FILE.toString('base64');

test('dataurl.parse', function (t) {
  const file = dataurl.parse(TEST_DATAURL);
  t.same(file.data, TEST_FILE, 'should be the expected file');
  t.same(file.mime, 'image/png', 'should be a png');
  t.notOk(file.charset, 'should not exist')
  t.end();
});


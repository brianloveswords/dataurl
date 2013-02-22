# dataurl [![Build Status](https://travis-ci.org/brianloveswords/dataurl.png?branch=master)](https://travis-ci.org/brianloveswords/dataurl)

# Install
```bash
$ npm install dataurl
```

# Usage

## dataurl.parse(string)
Parse a dataurl string. Returns an object with three properties:

* `mimetype` <String> 
* `charset` <String>
* `data` <Buffer>

If the input string isn't a valid dataURL, returns `false`.

## dataurl.format(options)<br>dataurl.convert(options)
Convert some data to a dataurl string. Options expects three properties

* `mimetype` <String> 
* `charset` <String>
* `data` <Buffer>

# License

MIT

```
Copyright (c) 2013 Brian J. Brennan

Permission is hereby granted, free of charge, to any person obtaining a
copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be included
in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
```

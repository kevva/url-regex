# url-regex [![Build Status](https://travis-ci.org/kevva/url-regex.svg?branch=master)](https://travis-ci.org/kevva/url-regex)

> Regular expression for matching URLs

## Install

```sh
$ npm install --save url-regex
```

## Usage

```js
var urlRegex = require('url-regex');

urlRegex().test('https://github.com');
//=> true

urlRegex().exec('This is a cool site https://github.com')[0].trim();
//=> https://github.com

'Multiple https://github.com http://google.com URLs'.match(urlRegex());
//=> ['https://github.com', 'http://google.com']
```

## License

MIT © [Kevin Mårtensson](http://kevinmartensson.com)

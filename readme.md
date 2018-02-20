# url-regex [![Build Status](http://img.shields.io/travis/averissimo/url-regex.svg?style=flat)](https://travis-ci.org/averissimo/url-regex)

[![Greenkeeper badge](https://badges.greenkeeper.io/averissimo/url-regex.svg)](https://greenkeeper.io/)

> Regular expression for matching URLs

This is a fork of [kevva/url-regex](https://github.com/kevva/url-regex) that deals with parenthesis in the end of textual links

Originaly based on this [gist](https://gist.github.com/dperini/729294) by Diego Perini.


## Install

```
$ npm install --save url-regex
```


## Usage

```js
const urlRegex = require('url-regex');

urlRegex().test('http://github.com foo bar');
//=> true

urlRegex().test('www.github.com foo bar');
//=> true

urlRegex({exact: true}).test('http://github.com foo bar');
//=> false

urlRegex({exact: true}).test('http://github.com');
//=> true

urlRegex({strict: false}).test('github.com foo bar');
//=> true

urlRegex({exact: true, strict: false}).test('github.com');
//=> true

'foo http://github.com bar //google.com'.match(urlRegex());
//=> ['http://github.com', '//google.com']
```


## API

### urlRegex(options)

Returns a regex for matching URLs.

#### options

##### exact

Type: `boolean`<br>
Default: `false`

Only match an exact string. Useful with `RegExp#test` to check if a string is a URL.

##### strict

Type: `boolean`<br>
Default: `true`

Force URLs to start with a valid protocol or `www`. If set to `false` it'll match the TLD against a list of valid [TLDs](https://github.com/stephenmathieson/node-tlds).


## Related

- [get-urls](https://github.com/sindresorhus/get-urls) - Get all URLs in text
- [linkify-urls](https://github.com/sindresorhus/linkify-urls) - Linkify URLs in text


## License

MIT © [André Veríssimo](https://github.com/averissimo), [Kevin Mårtensson](https://github.com/kevva) and [Diego Perini](https://github.com/dperini)

# url-regex [![Build Status](http://img.shields.io/travis/kevva/url-regex.svg?style=flat)](https://travis-ci.org/kevva/url-regex)

> Regular expression for matching URLs

Based on this [gist](https://gist.github.com/dperini/729294) by Diego Perini.


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

'foo http://github.com bar //google.com'.match(urlRegex());
//=> ['http://github.com', '//google.com']
```

`url-regex` forces URLs to start with a valid protocol or `www`.

`url-regex/non-strict` doesn't have this restriction. It'll also match the TLD against a list of valid [TLDs](https://github.com/stephenmathieson/node-tlds).

```js
const nonStrictUrlRegex = require('url-regex/non-strict');
nonStrictUrlRegex().test('github.com foo bar');
//=> true

nonStrictUrlRegex({exact: true}).test('github.com');
//=> true
```


## API

### urlRegex(options)

Returns a regex for matching URLs.

#### options

##### exact

Type: `boolean`<br>
Default: `false`

Only match an exact string. Useful with `RegExp#test` to check if a string is a URL.

## Related

- [get-urls](https://github.com/sindresorhus/get-urls) - Get all URLs in text
- [linkify-urls](https://github.com/sindresorhus/linkify-urls) - Linkify URLs in text


## License

MIT © [Kevin Mårtensson](https://github.com/kevva) and [Diego Perini](https://github.com/dperini)

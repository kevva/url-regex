'use strict';
const ipRegex = require('ip-regex');
const tlds = require('tlds');

module.exports = opts => {
	opts = Object.assign({strict: true}, opts);

	const protocol = `(?:(?:[a-z]+:)?//)${opts.strict ? '' : '?'}`;
	const auth = '(?:\\S+(?::\\S*)?@)?';
	const ip = ipRegex.v4().source;
	const host = '(?:(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)';
	const domain = '(?:\\.(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)*';
	const tld = `(?:\\.${opts.strict ? '(?:[a-z\\u00a1-\\uffff]{2,})' : `(?:${tlds.sort((a, b) => b.length - a.length).join('|')})`})\\.?`;
	const port = '(?::\\d{2,5})?';
	// Original regular expression from kevva (but not accepting any closing parenthesis)
	const path = '(?:[/?#][^\\s\\)"]*)?';

	const regex1 = `(?:${protocol}|www\\.)${auth}(?:localhost|${ip}|${host}${domain}${tld})${port}${path}`;
	// Accepts all closing parenthesis if there is an opening one
	const path2 = '(?:[/?#]([^\\s"]*\\([^\\s"]*))';
	const regex2 = `(?:${protocol}|www\\.)${auth}(?:localhost|${ip}|${host}${domain}${tld})${port}${path2}`;
	// Accepts closing parenthesis as long as in middle of link (not in the last)
	const path3 = '(?:[/?#][^\\s"]*[^\\s\\)"]+)?';
	const regex3 = `(?:${protocol}|www\\.)${auth}(?:localhost|${ip}|${host}${domain}${tld})${port}${path3}`;
	// Builds on all three regular expressions
	const regex = `((${regex2})|(${regex3})|(${regex1}))`;

	return opts.exact ? new RegExp(`(?:^${regex}$)`, 'i') : new RegExp(regex, 'ig');
};

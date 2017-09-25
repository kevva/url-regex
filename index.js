'use strict';
var ipRegex = require('ip-regex');
var tlds = require('tlds');

module.exports = opts => {
	opts = Object.assign({strict: true}, opts);

	var protocol = `(?:(?:[a-z]+:)?//)${opts.strict ? '' : '?'}`;
	var auth = '(?:\\S+(?::\\S*)?@)?';
	var ip = ipRegex.v4().source;
	var host = '(?:(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)';
	var domain = '(?:\\.(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)*';
	var tld = `(?:\\.${opts.strict ? '(?:[a-z\\u00a1-\\uffff]{2,})' : `(?:${tlds.sort((a, b) => b.length - a.length).join('|')})`})\\.?`;
	var port = '(?::\\d{2,5})?';
	var path = '(?:[/?#][^\\s"]*)?';
	var regex = `(?:${protocol}|www\\.)${auth}(?:localhost|${ip}|${host}${domain}${tld})${port}${path}`;

	return opts.exact ? new RegExp(`(?:^${regex}$)`, 'i') : new RegExp(regex, 'ig');
};

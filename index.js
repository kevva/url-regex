'use strict';
const ipRegex = require('ip-regex');
const tlds = require('tlds');

module.exports = function(options) {
	options = {
		strict: true,
		...options
	};

	var protocol = `(?:(?:[a-z]+:)?//)${options.strict ? '' : '?'}`;
	var auth = '(?:\\S+(?::\\S*)?@)?';
	var ip = ipRegex.v4().source;
	var host = '(?:(?:[a-z\\u00a1-\\uffff0-9][-_]*)*[a-z\\u00a1-\\uffff0-9]+)';
	var domain = '(?:\\.(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)*';
	var tld = `(?:\\.${options.strict ? '(?:[a-z\\u00a1-\\uffff]{2,})' : `(?:${tlds.sort(function (a, b) { return b.length - a.length; }).join('|')})`})\\.?`;
	var port = '(?::\\d{2,5})?';
	var path = '(?:[/?#][^\\s"]*)?';
	var regex = `(?:${protocol}|www\\.)${auth}(?:localhost|${ip}|${host}${domain}${tld})${port}${path}`;

	return options.exact ? new RegExp(`(?:^${regex}$)`, 'i') : new RegExp(regex, 'ig');
};

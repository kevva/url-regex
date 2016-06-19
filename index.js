'use strict';
var ipRegex = require('ip-regex');

module.exports = function (opts) {
	opts = opts || {};

	var protocol = '(?:(?:[a-z]+:)?//)';
	var auth = '(?:\\S+(?::\\S*)?@)?';
	var ip = ipRegex.v4().source;
	var host = '(?:(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)';
	var domain = '(?:\\.(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)*';
	var tld = '(?:\\.(?:[a-z\\u00a1-\\uffff]{2,}))\\.?';
	var port = '(?::\\d{2,5})?';
	var path = '(?:[/?#][^\\s"]*)?';
	var withProtocol = '(?:' + protocol + '|www\\.)' + auth + '(?:localhost|' + ip + '|' + host + domain + tld + ')';
	var withOutProtocol = '(?:localhost|' + host + domain + tld + ')';

	var foo = '';
	if (opts.liberal) {
		foo = '(?:' + withProtocol + '|' + withOutProtocol + ')';
	} else {
		foo = withProtocol;
	}

	var regex = [
		foo,
		port, path
	].join('');

	return opts.exact ? new RegExp('(?:^' + regex + '$)', 'i') : new RegExp(regex, 'ig');
};

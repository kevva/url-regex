'use strict';

var ip = require('ip-regex').v4().source;
var TLDS = require('./tlds.json').join('|');

var cache = { tld: null, url: null, exact: null };

var auth = '(?:\\S+(?::\\S*)?@)?';
var domain = '(?:\\.(?:xn--[a-z0-9\\-]{1,59}|(?:[a-z\\u00a1-\\uffff0-9]+-?){0,62}[a-z\\u00a1-\\uffff0-9]{1,63}))*';
var host = '(?:xn--[a-z0-9\\-]{1,59}|(?:(?:[a-z\\u00a1-\\uffff0-9]+-?){0,62}[a-z\\u00a1-\\uffff0-9]{1,63}))';
var path = '(?:\/[^\\s]*)?';
var port = '(?::\\d{2,5})?';
var protocol = '(?:(?:(?:\\w)+:)?\/\/)?';

function tld(tlds) {
	tlds = tlds ? (tlds + '|' + TLDS) : TLDS;
	return '(?:\\.(?:xn--[a-z0-9\\-]{1,59}|' + tlds + '+))';
}

function url(tld) {
	return [
		protocol + auth + '(?:' + ip + '|',
		'(?:localhost)|' + host + domain + tld + ')' + port + path
	].join('');
}

function regex(tlds) {
	if (tlds && typeof tlds == 'object' && tlds.length) {
		return url(tld(tlds.join('|')));
	}

	if (!cache.url) {
		if (!cache.tld) cache.tld = tld();
		cache.url = url(cache.tld);
	}

	return cache.url;
}

/**
 * Regular expression for matching URLs
 *
 * @param {Object} opts
 * @api public
 */

module.exports = function (opts) {
	opts = opts || {};

	if (!opts.exact) {
		return new RegExp('(?:^|\\s)(["\'])?' + regex(opts.additionalTlds) + '\\1', 'ig');
	}

	if (!cache.exact) {
		cache.exact = new RegExp('(?:^' + regex(opts.additionalTlds) + '$)', 'i');
	}

	return cache.exact;
};

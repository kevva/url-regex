'use strict';

var tlds = require('./tlds.json').join('|');

/**
 * Regular expression for matching URLs
 *
 * @api public
 */

module.exports = function () {
	var auth = '(?:\\S+(?::\\S*)?@)?';
	var domain = '(?:\\.(?:xn--[a-z0-9\\-]{1,59}|(?:[a-z\\u00a1-\\uffff0-9]+-?){0,62}[a-z\\u00a1-\\uffff0-9]{1,63}))*';
	var host = '(?:xn--[a-z0-9\\-]{1,59}|(?:(?:[a-z\\u00a1-\\uffff0-9]+-?){0,62}[a-z\\u00a1-\\uffff0-9]{1,63}))';
	var path = '(?:/[^\\s]*)?';
	var port = '(?::\\d{2,5})?';
	var protocol = '(?:(?:(?:https?|ftp):)?\/\/)?';
	var tld = '(?:\\.(?:xn--[a-z0-9\\-]{1,59}|' + tlds + '+))';
	var ips = [
		'(?!10(?:\\.\\d{1,3}){3})',
		'(?!127(?:\\.\\d{1,3}){3})',
		'(?!169\\.254(?:\\.\\d{1,3}){2})',
		'(?!192\\.168(?:\\.\\d{1,3}){2})',
		'(?!172\\.(?:1[6-9]|2\\d|3[0-1])(?:\\.\\d{1,3}){2})',
		'(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])',
		'(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}',
		'(?:\\.(?:[1-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))'
	].join('');

	return new RegExp([
		'(?:^|\\s)(["\'])?' + protocol + auth + '(?:' + ips + '|',
		'(?:localhost)|' + host + domain + tld + ')' + port + path + '\\1'
	].join(''), 'ig');
};

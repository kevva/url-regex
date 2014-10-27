'use strict';

var urlRegex = require('./');
var test = require('ava');

test('match URLs', function (t) {
	var fixtures = [
		'http://userid:password@example.com:8080',
		'http://userid:password@example.com:8080/',
		'http://userid@example.com',
		'http://userid@example.com/',
		'http://userid@example.com:8080',
		'http://userid@example.com:8080/',
		'http://userid:password@example.com',
		'http://userid:password@example.com/',
		'http://142.42.1.1/',
		'http://142.42.1.1:8080/',
		'http://➡.ws/䨹',
		'http://⌘.ws',
		'http://⌘.ws/',
		'http://foo.com/blah_(wikipedia)#cite-1',
		'http://foo.com/blah_(wikipedia)_blah#cite-1',
		'http://foo.com/unicode_(✪)_in_parens',
		'http://foo.com/(something)?after=parens',
		'http://☺.damowmow.com/',
		'http://code.google.com/events/#&product=browser',
		'http://j.mp',
		'ftp://foo.bar/baz',
		'http://foo.bar/?q=Test%20URL-encoded%20stuff',
		'http://مثال.إختبار',
		'http://例子.测试',
		'//userid:password@example.com:8080',
		'//google.com',
		'www.☺.com',
		'www.goooooooooogle.com/yehiiiiiii'
	];

	fixtures.forEach(function (el) {
		t.assert(urlRegex().test(el));
	});

	t.assert(urlRegex().exec('asasdasd //google.com')[0].trim() === '//google.com');
	t.end();
});

test('do not match URLs', function (t) {
	var fixtures = [
		'http://',
		'http://.',
		'http://..',
		'http://../',
		'http://?',
		'http://??',
		'http://??/',
		'http://#',
		'http://##',
		'http://##/',
		'//',
		'//a',
		'///a',
		'///',
		'http:///a',
		'foo.com',
		'asd.foo.com',
		'rdar://1234',
		'h://test',
		'http:// shouldfail.com',
		':// should fail',
		'http://-error-.invalid/',
		'http://-a.b.co',
		'http://a.b-.co',
		'http://0.0.0.0',
		'http://10.1.1.0',
		'http://224.1.1.1',
		'http://123.123.123',
		'http://3628126748',
		'http://.www.foo.bar/',
		'http://.www.foo.bar./'
	];

	fixtures.forEach(function (el) {
		t.assert(!urlRegex().test(el));
	});

	t.end();
});

'use strict';
var test = require('ava');
var tlds = require('tlds');
var urlRegex = require('./');

test('match URLs', function (t) {
	var fixtures = tlds.map(function (tld) {
		return 'google.' + tld;
	});

	fixtures = fixtures.concat(tlds.map(function (tld) {
		return '"google.' + tld + '"';
	}));

	fixtures = fixtures.concat([
		'https://asd@xn----7sbbtkohtqhvkc8j.xn--p1ai',
		'https://www.foo.com/foo/?bar=baz&inga=42&quux',
		'http://142.42.1.1/',
		'http://142.42.1.1:8080/',
		'http://0.0.0.0',
		'http://10.1.1.0',
		'http://10.1.1.1',
		'http://10.1.1.255',
		'http://127.0.0.1',
		'http://224.1.1.1',
		'http://www.foo.com/wpstyle/?p=364',
		'http://foo.com/blah_(wikipedia)#cite-1',
		'http://foo.com/blah_(wikipedia)_blah#cite-1',
		'http://foo.com/unicode_(✪)_in_parens',
		'http://foo.com/(something)?after=parens',
		'http://a.b.c.d.e.f.g.h.i.j.k.l.m.n.o.p.q.r.s.t.u.v.w.x.y.z.com',
		'http://mw1.google.com/mw-earth-vectordb/kml-samples/gp/seattle/gigapxl/$[level]/r$[y]_c$[x].jpg',
		'http://user:pass@example.com:123/one/two.three?q1=a1&q2=a2#body',
		'http://www.example.xn--really-long-punycode-test-string-test-tests-123-tests-tests/',
		'http://www.microsoft.xn--comindex-g03d.html.irongeek.com/',
		'http://xn--h32b13vza.xn--3e0b707e/',
		'http://xn—y3h.tk/',
		'http://nic.xn--unup4y',
		'http://☺.damowmow.com',
		'http://☺.damowmow.com/',
		'http://code.google.com/events/#&product=browser',
		'http://foo.bar/?q=Test%20URL-encoded%20stuff',
		'http://userid:password@example.com:8080',
		'http://userid:password@example.com:8080/',
		'http://userid@example.com',
		'http://userid@example.com/',
		'http://userid@example.com:8080',
		'http://userid@example.com:8080/',
		'http://userid:password@example.com',
		'http://userid:password@example.com/',
		'http://localhost',
		'http://localhost/',
		'http://➡.com',
		'http://➡.com/䨹',
		'http://⌘.com',
		'http://⌘.com/',
		'http://google.com',
		'http://google.com/',
		'http://1337.net',
		'www.google.com',
		'www.google.com/',
		'//google.com',
		'//google.com/',
		'//userid:password@example.com',
		'//userid:password@example.com/',
		'//☺.damowmow.com',
		'//☺.damowmow.com/',
		'localhost',
		'localhost/'
	]);

	fixtures.forEach(function (el) {
		if (!urlRegex().exec(el)) {
			t.assert(false, el);
			return;
		}

		t.assert(urlRegex().exec(el)[0] === el, el);
	});

	t.end();
});

test('do not match URLs', function (t) {
	var fixtures = [
		'//',
		'///',
		'///a',
		'//a',
		':// should fail',
		'h://test',
		'http:// shouldfail.com',
		'http://##',
		'http://##/',
		'http://#',
		'http://',
		'http://-a.b.co',
		'http://-error-.invalid/',
		'http://.',
		'http://..',
		'http://../',
		'http://.www.foo.bar./',
		'http://.www.foo.bar/',
		'http:///a',
		'http://1.1.1.1.1',
		'http://123.123.123',
		'http://3628126748',
		'http://900.900.900.900/',
		'http://142.42.1.1:8080:30/',
		'http://362812.34',
		'http://3628126748',
		'http://900.900.900.900/',
		'http://?',
		'http://??',
		'http://??/',
		'http://?example.?om/',
		'http://a.b--c.de/',
		'http://a.b-.co',
		'http://foo.bar/foo(bar)baz quux',
		'http://foo.bar?q=Spaces should be encoded',
		'http://foo_bar.com',
		'http://foo_bar.google.com',
		'http://go/ogle.com',
		'http://google.com/ /',
		'http://google\\.com',
		'http://www(google.com',
		'http://www.example.xn--overly-long-punycode-test-string-test-tests-123-test-test123/',
		'http://www=google.com',
		'https://www.g.com/error\n/bleh/bleh',
		'http://www.foo.bar./',
		'rdar://1234',
	];

	fixtures.forEach(function (el) {
		if (!urlRegex().exec(el)) {
			t.assert(true);
			return;
		}

		t.assert(urlRegex().exec(el)[0] !== el, el);
	});

	t.end();
});

'use strict';

var urlRegex = require('./');
var test = require('ava');

test('match URLs', function (t) {
    t.plan(3);

    var fixtures = [
        'https://github.com',
        'http://google.com'
    ];

    fixtures.forEach(function (el) {
        t.assert(urlRegex().test(el), el);
    });

    t.assert(urlRegex().exec('https://github.com')[0].trim() === 'https://github.com');
});

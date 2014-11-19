'use strict';

var fs = require('fs');
var path = require('path');
var tlds = require('tlds');

tlds = tlds.sort(function (a, b) {
	return b.length - a.length;
});

fs.writeFileSync(path.join(__dirname, '../tlds.json'), JSON.stringify(tlds));

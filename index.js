'use strict';
const tlds = require('tlds');
const makeUrlRegex = require('./make-url-regex');

module.exports = options => {
	return makeUrlRegex({
		tlds,
		...options
	});
};

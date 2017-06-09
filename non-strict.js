const tlds = require('tlds');
const buildRegex = require('./base');

module.exports = opts => buildRegex(opts, tlds.join('|'));

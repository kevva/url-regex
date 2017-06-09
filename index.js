const buildRegex = require('./base');

// This needs to be called this way because
// buildRegex accepts a second parameter, while `url-regex` doesn't
module.exports = opts => buildRegex(opts);

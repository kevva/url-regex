'use strict';

/**
 * Regular expression for matching URLs
 *
 * @api public
 */

module.exports = function () {
    return /(^|\s)((https?:\/\/)?[\w-]+(\.[\w-]+)+\.?(:\d+)?(\/\S*)?)/gi;
};


/*!
 * GrabIt
 * Copyright(c) 2012 ebtokyo <emmanuel.boudrant@gmail.com>
 */

var URL = require('url');

/**
 * GrabIt URL object.
 *
 * @type Object
 */
exports.GUrl = function (urlStr) {
    this.url = URL.parse(urlStr, true);
    this.getUrl = function () {
        return this.url.href;
    };
};
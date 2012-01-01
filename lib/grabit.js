
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
    this.getOptions = function () {
        return {
            host: this.url.host,
            method: 'GET',
            path: this.url.pathname + this.url.search,
            headers: {
                'Connection': 'keep-alive'
            }
        };
    };
};
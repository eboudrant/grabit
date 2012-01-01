/*!
 * GrabIt
 * Copyright(c) 2012 ebtokyo <emmanuel.boudrant@gmail.com>
 */
var URL = require('url');
var http = require('http');
/**
 * GrabIt URL object.
 *
 * @type Object
 */
var GUrl = function(urlStr) {
        'use strict';
        this.url = URL.parse(urlStr, true);
        this.getHref = function() {
            return this.url.href;
        };
        this.getFilename = function() {
            var name = this.url.pathname;
            name = name.substring(0, (name.indexOf("?") === -1) ? name.length : name.indexOf("?"));
            name = name.substring(name.lastIndexOf("/") + 1, name.length);
            return name;
        };
        this.getOptions = function() {
            return {
                secure: (this.url.protocol === 'https:'),
                host: this.url.host,
                method: 'GET',
                path: this.url.pathname + this.url.search,
                headers: {
                    'Connection': 'keep-alive',
                    'User-Agent': 'GrabIt'
                }
            };
        };
        this.transfertTo = function(writable) {
            var that = this,
                request = http.request(this.getOptions());
            request.end();
            request.on('response', function(response) {
                var headers = response.headers,
                    redirect;
                if (response.headers.location && response.headers.location !== that.url.href) {
                    redirect = new GUrl(response.headers.location);
                    redirect.transfertTo(writable);
                }
                else {
                    headers['Content-Disposition'] = 'filename=' + that.getFilename();
                    writable.writeHead(200, headers);
                    response.on('data', function(chunk) {
                        writable.write(chunk);
                    });
                    response.on('end', function() {
                        writable.end();
                    });
                }
            });
        };
    };
exports.GUrl = GUrl;
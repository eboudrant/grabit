/*!
 * GrabIt
 * Copyright(c) 2012 ebtokyo <emmanuel.boudrant@gmail.com>
 */
var URL = require('url');
var http = require('http');
var https = require('https');
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
        this.isValid = function() {
            return this.url.hostname && this.url.pathname;
        };
        this.getFilename = function() {
            var name = this.url.pathname;
            name = name.substring(0, (name.indexOf("?") === -1) ? name.length : name.indexOf("?"));
            name = name.substring(name.lastIndexOf("/") + 1, name.length);
            return name;
        };
        this.getOptions = function() {
            return {
                hostname: this.url.hostname,
                host: this.url.hostname,
                method: 'GET',
                path: this.url.pathname + this.url.search,
                headers: {
                    'Connection': 'close',
                    'User-Agent': 'GrabIt'
                }
            };
        };
        this.transfertTo = function(writable) {
            var that = this,
                transport = http;
            if (!this.isValid()) {
                writable.writeHead(404, {
                    'Content-Type': 'text/html',
                    'Cache-control': 'no-store'
                });
                writable.end('404 - not found');
            }
            else {
                if (this.url.protocol === 'https:') {
                    transport = https;
                }
                transport.get(this.getOptions()).on('response', function(response) {
                    var headers = response.headers,
                        redirect;
                    if (response.statusCode === 302 || (response.headers.location && response.headers.location !== that.url.href)) {
                        redirect = new GUrl(response.headers.location);
                        redirect.transfertTo(writable);
                    }
                    else {
                        headers['Content-Disposition'] = 'attachment; filename=' + that.getFilename();
                        writable.writeHead(response.statusCode, headers);
                        response.on('data', function(chunk) {
                            writable.write(chunk);
                        });
                        response.on('end', function() {
                            writable.end();
                        });
                    }
                });
            }
        };
    };
exports.GUrl = GUrl;
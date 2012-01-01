/*!
 * GrabIt
 * Copyright(c) 2012 ebtokyo <emmanuel.boudrant@gmail.com>
 */
var grabit = require('../lib/grabit.js');
var http = require('http');
/**
 * grabitDownload test require an access to https://ajax.googleapis.com
 * test file used is jquery.min.js
 */
exports.grabitDownload = function(test) {
    var stringUrl = 'http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js',
        o = new grabit.GUrl(stringUrl),
        request = http.request(o.getOptions());
    request.end();
    request.on('response', function(response) {
        response.setEncoding('utf8');
        test.equal(response.statusCode, 200);
        test.done();
    });
};
exports.grabitFromSimpleUrl = function(test) {
    var stringUrl = 'http://www.cambiaresearch.com/snippets/csharp/regex/uri_regex.aspx',
        o = new grabit.GUrl(stringUrl);
    test.equal(o.url.href, stringUrl);
    test.done();
};
exports.grabitFromUrlWithoutExtension = function(test) {
    var stringUrl = 'http://www.cambiaresearch.com/snippets/csharp/regex/uri_regex',
        o = new grabit.GUrl(stringUrl);
    test.equal(o.url.href, stringUrl);
    test.done();
};
exports.grabitFromUrlWithPort = function(test) {
    var stringUrl = 'http://www.cambiaresearch.com:80/snippets/csharp/regex/uri_regex',
        o = new grabit.GUrl(stringUrl);
    test.equal(o.url.href, stringUrl);
    test.done();
};
exports.grabitFromUrlWithHash = function(test) {
    var stringUrl = 'http://www.cambiaresearch.com/snippets/csharp/regex/uri_regex.aspx#hash',
        o = new grabit.GUrl(stringUrl);
    test.equal(o.url.href, stringUrl);
    test.done();
};
exports.grabitFromUrlWithQuery = function(test) {
    var stringUrl = 'http://www.cambiaresearch.com/snippets/csharp/regex/uri_regex.aspx?q=t&a=b',
        o = new grabit.GUrl(stringUrl);
    test.equal(o.url.href, stringUrl);
    test.done();
};
exports.grabitFromUrlWithQueryAndHash = function(test) {
    var stringUrl = 'http://www.cambiaresearch.com/snippets/csharp/regex/uri_regex.aspx?q=t&a=b#hash',
        o = new grabit.GUrl(stringUrl);
    test.equal(o.url.href, stringUrl);
    test.done();
};
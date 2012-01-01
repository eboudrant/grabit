
/*!
 * GrabIt
 * Copyright(c) 2012 ebtokyo <emmanuel.boudrant@gmail.com>
 */
 
var grabit = require('../lib/grabit.js');

exports.grabitFromSimpleUrl = function (test) {
    var stringUrl = 'http://www.cambiaresearch.com/snippets/csharp/regex/uri_regex.aspx';
    var o = new grabit.GUrl(stringUrl);
    test.equal(o.getUrl(), stringUrl);
    test.done();
};

exports.grabitFromUrlWithoutExtension = function (test) {
    var stringUrl = 'http://www.cambiaresearch.com/snippets/csharp/regex/uri_regex';
    var o = new grabit.GUrl(stringUrl);
    test.equal(o.getUrl(), stringUrl);
    test.done();
};

exports.grabitFromUrlWithPort = function (test) {
    var stringUrl = 'http://www.cambiaresearch.com:80/snippets/csharp/regex/uri_regex';
    var o = new grabit.GUrl(stringUrl);
    test.equal(o.getUrl(), stringUrl);
    test.done();
};

exports.grabitFromUrlWithHash = function (test) {
    var stringUrl = 'http://www.cambiaresearch.com/snippets/csharp/regex/uri_regex.aspx#hash';
    var o = new grabit.GUrl(stringUrl);
    test.equal(o.getUrl(), stringUrl);
    test.done();
};

exports.grabitFromUrlWithQuery = function (test) {
    var stringUrl = 'http://www.cambiaresearch.com/snippets/csharp/regex/uri_regex.aspx?q=t&a=b';
    var o = new grabit.GUrl(stringUrl);
    test.equal(o.getUrl(), stringUrl);
    test.done();
};

exports.grabitFromUrlWithQueryAndHash = function (test) {
    var stringUrl = 'http://www.cambiaresearch.com/snippets/csharp/regex/uri_regex.aspx?q=t&a=b#hash';
    var o = new grabit.GUrl(stringUrl);
    test.equal(o.getUrl(), stringUrl);
    test.done();
};
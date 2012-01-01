/*!
 * GrabIt
 * Copyright(c) 2012 ebtokyo <emmanuel.boudrant@gmail.com>
 */
var express = require('express');
var grabit = require("./lib/grabit.js");
var app = express.createServer(express.logger());
/**
 * ExpressJS /grabit mapping
 */
app.get('/grabit', function(req, res) {
    if (req.query.src) {
        console.log('new request on ' + req.query.src + ' ...');
        var grabIt = new grabit.GUrl(req.query.src);
        grabIt.transfertTo(res);
    }
    else {
        res.writeHead(200, {
            'Content-Type': 'text/html',
            'Cache-control': 'no-store'
        });
        res.end('not found');
    }
});
/**
 * ExpressJS launcher
 */
var port = process.env.PORT || 5000;
app.listen(port, function() {
    console.log('Listening on ' + port);
});
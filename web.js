/*!
 * GrabIt
 * Copyright(c) 2012 ebtokyo <emmanuel.boudrant@gmail.com>
 */
var express = require('express'),
    grabit = require("./lib/grabit.js"),
    app = express.createServer(express.logger());
app.set('view engine', 'jade');
app.set('views', __dirname + '/www');
app.use(express.static(__dirname + '/www'));
/**
 * ExpressJS /grabit mapping
 */
app.get('/', function(req, res) {
    res.render('index');
});
app.get('/grabit', function(req, res) {
    if (req.query.src) {
        console.log('new request on ' + req.query.src + ' ...');
        var grabIt = new grabit.GUrl(req.query.src);
        grabIt.transfertTo(res);
    }
    else {
        res.writeHead(404, {
            'Content-Type': 'text/html',
            'Cache-control': 'no-store'
        });
        res.end('404 - not found');
    }
});
/**
 * ExpressJS launcher
 */
var port = process.env.PORT || 5000;
app.listen(port, function() {
    console.log('Listening on http://localhost:' + port);
});
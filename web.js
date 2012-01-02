/*!
 * GrabIt
 * Copyright(c) 2012 ebtokyo <emmanuel.boudrant@gmail.com>
 */
var express = require('express'),
    grabit = require("./lib/grabit.js"),
    app = express.createServer(express.logger()),
    dbox = require("dbox"),
    client = dbox.createClient({
        app_key: '7hrx1i233qhlf73',
        app_secret: 'p1jtpa134jz1f67'
    });
    
app.set('view engine', 'jade');
app.set('views', __dirname + '/www');
app.use(express.static(__dirname + '/www'));

/**
 * ExpressJS /grabit mapping
 */
app.get('/', function(req, res) {
    res.render('index');
});

app.get('/db_callback', function(req, res) {
    if (req.query.oauth_token) {
        var grabIt = new grabit.GUrl(req.query.src);
        grabIt.dropboxTo(client, req.query.oauth_token, req.query.oauth_token_secret, req.query.uid, res);
    }
    else {
        res.writeHead(404, {
            'Content-Type': 'text/html',
            'Cache-control': 'no-store'
        });
        res.end('404 - not found');
    }
});

app.get('/dropit', function(req, res) {
    if (req.query.src) {
        var url, callback = 'http://localhost:5000/db_callback?src=test';
        client.request_token(function(status, request_token_reply) {
            if (status === 200) {
                // todo, set in session ?
                url = client.build_authorize_url(request_token_reply.oauth_token, callback);
                res.contentType('text/plain');
                res.header('Content-Length', url.length);
                res.end(url);
            }
            else {
                res.writeHead(status, {
                    'Content-Type': 'text/html',
                    'Cache-control': 'no-store'
                });
                res.end(status + ' - ' + request_token_reply);
            }
        });
    }
    else {
        res.writeHead(404, {
            'Content-Type': 'text/html',
            'Cache-control': 'no-store'
        });
        res.end('404 - not found');
    }
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
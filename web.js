var express = require('express');
var http = require("http");

var app = express.createServer(express.logger());

app.get('/', function(request, response) {
  response.send('Hello World!');
});

app.get('/grabit', function(req, res) {
    if (req.query.path) {
        var options = {
            port: req.query.port,
            host: req.query.host,
            method: 'GET',
            path: req.query.path,
            headers: {
                'Connection': 'keep-alive'
            }
        };
        var request = http.request(options);
        request.on('response', function(response) {
            console.log(response.headers);
            res.writeHead(200, response.headers);
            response.on('data', function(chunk) {
                res.write(chunk);
            });
            response.on('end', function() {
                res.end();
            });
        });
        request.end();
    }
    else {
        res.writeHead(200, {
            'Content-Type': 'text/html',
            'Cache-control': 'no-store'
        });
        res.end('not found');
    }
});

var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});
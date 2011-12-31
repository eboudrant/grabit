var express = require('express');
var http = require("http");

var app = express.createServer(express.logger());

app.get('/', function(request, response) {
  response.send('Hello World!');
});

app.get('/grabit', function(req, res) {
    if (req.query.path) {
        var grabIt = {
                host: req.query.host,
                port: req.query.port,
                path: req.query.path,
                getUrl: function() { 
                    return 'http://' + this.host + ':' + this.port + this.path; 
                },
                getName: function() { 
                    var name = req.query.path;
                    name = name.substring(0, (name.indexOf("#") == -1) ? name.length : name.indexOf("#"));
                    name = name.substring(0, (name.indexOf("?") == -1) ? name.length : name.indexOf("?"));
                    name = name.substring(name.lastIndexOf("/") + 1, name.length);
                    return name;
                }
            };
        var options = {
            port: grabIt.port,
            host: grabIt.host,
            method: 'GET',
            path: grabIt.path,
            headers: {
                'Connection': 'keep-alive'
            }
        };
        var request = http.request(options);
        request.on('response', function(response) {
            var headers = response.headers;
            headers['Content-Disposition'] = 'attachment; filename=' + grabIt.getName();
            res.writeHead(200, headers);
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
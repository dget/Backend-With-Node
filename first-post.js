var express = require('express')

var app = express.createServer()

app.get('/', function(req, res) {
    res.send('<!doctype html><html>' +
             '<head><title>Welcome to Node</title></head>' +
             '<body><form method="POST" action="/post"><textarea name="post"></textarea>' +
             '<input type="text" name="username"><button type="submit">Submit</button>' +
             '</body></html>');
});

app.post('/post', function(req, res) {
    res.send('Got it!')
});
app.listen(4000)

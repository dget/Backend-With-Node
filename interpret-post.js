var express = require('express')
var app = express.createServer()

app.use(express.bodyParser())

var mongodb = require('mongodb')
var server = new mongodb.Server('127.0.0.1', '27017')
var client = new mongodb.Db('test', server)

app.get('/', function(req, res) {
    res.send('<!doctype html><html>' +
             '<head><title>Welcome to Node</title><link rel="stylesheet" href="http://twitter.github.com/bootstrap/assets/css/bootstrap-1.2.0.min.css"></head>' +
             '<body><form method="POST" action="/post"><textarea name="post"></textarea>' +
             '<input type="text" name="username"><button type="submit">Submit</button>' +
             '</body></html>');
});

app.get('/posts', function(req, res) {
    client.open(function(err, p_client) {
        client.collection('posts', function(err, collection) {
            collection.find({}).toArray(function(err, posts) {
                page_html = '<!doctype html><html>' +
                    '<head><title>Welcome to Node</title><link rel="stylesheet" href="http://twitter.github.com/bootstrap/assets/css/bootstrap-1.2.0.min.css"></head>' +
                    '<body><table><thead><tr><th>User</th><th>Post</th></tr></thead>' +
                    '<tbody>';
                var i = 0;
                for(i=0;i < posts.length; i++) {
                    post = posts[i];
                    page_html += '<tr><td>' + post.user + '</td><td>' + post.post + '</td></tr>';
                }
                page_html += '</tbody></table></body></html>';
                res.send(page_html);
            });
        });
    });
});

app.post('/post', function(req, res) {
    client.open(function(err, p_client){
        client.collection('posts', function(err, collection) {
            collection.save({'user': req.body.username, 'post': req.body.post});
            res.send('Got your message, ' + req.body.username + '! You said: ' + req.body.post);
        });
    });
});

app.listen(4000)

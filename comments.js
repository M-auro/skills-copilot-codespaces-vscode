// create a webserver
var http = require('http');
var fs = require('fs');
var path = require('path');
var url = require('url');
var comments = [];
http.createServer(function (req, res) {
    var urlObj = url.parse(req.url, true);
    var pathname = urlObj.pathname;
    if (pathname === '/') {
        fs.readFile(path.join(__dirname, 'index.html'), 'utf-8', function (err, data) {
            if (err) {
                console.log(err);
                res.statusCode = 404;
                res.end('Not Found');
            } else {
                var list = '';
                comments.forEach(function (item) {
                    list += '<li>' + item + '</li>';
                });
                data = data.replace('<!---comments--->', list);
                res.end(data);
            }
        });
    } else if (pathname === '/post') {
        var comment = urlObj.query.comment;
        comments.push(comment);
        res.statusCode = 302;
        res.setHeader('Location', '/');
        res.end();
    } else {
        var filePath = path.join(__dirname, pathname);
        fs.exists(filePath, function (exists) {
            if (!exists) {
                res.statusCode = 404;
                res.end('Not Found');
            } else {
                fs.readFile(filePath, 'binary', function (err, data) {
                    if (err) {
                        console.log(err);
                        res.statusCode = 500;
                        res.end('Server Error');
                    } else {
                        res.write(data, 'binary');
                        res.end();
                    }
                });
            }
        });
    }
}).listen(8080);
// 1.浏览器请求/的时候，返回index.html的内容
// 2.浏览器请求/post的时候，把评论保存起来，然后重定向到/
// 3.浏览器请求其他的文件，返回对应的文件内容
// 4.如果文件不存在，返回404
// 5.如果服务器内部出错，返回500
// 6.如果文件是目录，返回403
// 7.如果文件是其他类型，返回404
// 8.如果文件是图片，返回图片
// 9.如果文件是文本，返回文本
// 10.如果文件是视频，返回视频
//
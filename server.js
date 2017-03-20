/**
 * @file study connect
 */

let http = require('http');
let fs = require('fs');

let server = http.createServer((req, res) => {

    let serve = (path, type) => {
        res.writeHead(200, {'Content-Type': type});
        fs.createReadStream(path).pipe(res);
    };

    if ('GET' === req.method && '/images' === req.url.substr(0, 7) && '.jpg' === req.url.substr(-4)) {
        fs.stat(__dirname + req.url, (err, stat) => {
            if (err || !stat.isFile()) {
                res.writeHead(404);
                res.end('404 NOT FOUND.');
                return;
            }
            serve(__dirname + req.url, 'application/jpg');
        });
    } else if ('GET' === req.method && '/' === req.url) {
        serve(__dirname + '/index.html', 'text/html');
    } else {
        console.log(req.url);
        res.writeHead(404);
        res.end('404 NOT FOUND.');
    }
});

server.listen(3000);


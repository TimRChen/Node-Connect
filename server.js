/**
 * @file study connect, use connect complete some mission: 1.托管静态文件 2.处理错误以及损坏或者不存在的URL 3.处理不同类型的请求
 * 由于connect版本更新至3.x，故connect.static中间件已被移除，现通过安装serve-static解决
 * 迭代: 用中间件模式实现static中间件功能: 1.记录请求处理时间 2.托管静态文件 3.处理授权
 */

let connect = require('connect');
// let serveStatic = require('serve-static');
let fs = require('fs');

let app = connect();
// or let server = http.createServer(app);
let morgan = require('morgan');
// 替换connect.logger中间件


app.use((req, res, next) => {
    // 记录日志
    console.log(' %s %s ', req.method, req.url);
    next();
});

app.use((req, res, next) => {
    let serve = (path, type) => {
        res.writeHead(200, {'Content-Type': type});
        fs.createReadStream(path).pipe(res);
    };
    if ('GET' === req.method && '/images' === req.url.substr(0, 7)) {
        fs.stat(__dirname + req.url, (err, stat) => {
            if (err || !stat.isFile()) {
                res.writeHead(404);
                res.end('Not Found');
                return;
            }
            serve(__dirname + req.url, 'application/jpg');
        });
    } else {
        next();
    }
});

app.use((req, res, next) => {
    let serve = (path, type) => {
        res.writeHead(200, {'Content-Type': type});
        fs.createReadStream(path).pipe(res);
    };
    if ('GET' === req.method && '/' === req.url) {
        serve(__dirname + '/index.html', 'text/html');
    } else {
        next();
    }
});

app.use((req, res, next) => {
    res.writeHead(404);
    res.end('Not Found');
});

morgan('dev')

// 文件托管
// app.use(serveStatic(__dirname + '/website'));

app.listen(3000);

/**
 * @file connect应用
 * 配置两条路由： 第一条很快得到相应，另外一条1s后得到响应
 */

let connect = require('connect');
let morgan = require('morgan');
let time = require('./request-time');

let app = connect();

// 记录请求情况
morgan('dev');

// 实现时间中间件
app.use(time({time: 500}));

// 快速响应
app.use((req, res, next) => {
    if ('/a' === req.url) {
        res.writeHead(200);
        res.end('Fast!');
    } else {
        next();
    }
});

// 慢速响应
app.use((req, res, next) => {
    if ('/b' === req.url) {
        setTimeout(() => {
            res.writeHead(200);
            res.end('Slow!');
        }, 1000);
    } else {
        next();
    }
});


app.listen(3000);

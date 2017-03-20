/**
 * @file study connect, use connect complete some mission: 1.托管静态文件 2.处理错误以及损坏或者不存在的URL 3.处理不同类型的请求
 * 由于connect版本更新至3.x，故connect.static中间件已被移除，现通过安装serve-static解决
 */

let connect = require('connect');
let serveStatic = require('serve-static');

let app = connect();
// or let server = http.createServer(app);

// 文件托管
app.use(serveStatic(__dirname + '/website'));

app.listen(3000);


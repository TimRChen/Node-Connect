/**
 * @file 请求时间中间件
 * 
 * 选项:  - 'time'('Number')：超时阈值（默认100）
 * 
 * @param {Object} options
 * @api public
 */

module.exports = options => {
    let time = options.time || 100;
    return (req, res, next) => {
        let timer = setTimeout(() => {
            console.log(
                '\033[90m%s %s\033[39m \033[91mis taking too long!\033[39m',
                req.method,
                req.url
            );
        }, time);
        let end = res.end;
        res.end = (chunk, encoding) => {
            res.end = end;
            res.end(chunk, encoding);
            clearTimeout(timer);
        };
        next();
    };
}
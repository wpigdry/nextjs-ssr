const Router = require('koa-router');


function routerConfig(handle) {
    const route = new Router();
    // 这里原本是应该配置proxy代理服务器
    // 不过本次是demo，直接本地响应

    route.post('/clkkkkkk', (ctx, next) => {
        ctx.set('Access-Control-Allow-Origin', '*');
        console.log(ctx.req.url, '走到了这里');

        ctx.body = {
            a: 8
        }
        next();
    });
    return route;
};

module.exports = routerConfig;

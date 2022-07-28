const Router = require('koa-router');


function routerConfig(handle) {
    const route = new Router();

    if(process.env.NODE_ENV === 'development') {
        const proxy = require('koa-proxy');
    
        route.all(
            ['/postapi/*'],
            ctx => {
                console.log('转发wwwwwwwwww');

                // 走到了这里，但是转发未成功
                proxy({
                    host: 'http://127.0.0.1:8088/'
                })
            }
            // proxy({
            //     host: 'http://127.0.0.1:8080'
            // })
        )
    }

    route.get('*', async (ctx, next) => {
        // 处理所有get请求，主要是pages的ssr页面

        const matched = router.match(ctx.path, ctx.method);
        // 当该请求会被其他路由处理时直接进入下一个中间件
        if (matched.path.length > 1) {
            return next();
        }
        await handle(ctx.req, ctx.res);
        ctx.respond = false;
        // 进入下一个中间件
        return next();
    });

    return route;
};

module.exports = routerConfig;

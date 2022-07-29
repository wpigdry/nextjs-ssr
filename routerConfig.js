const Router = require('koa-router');

function routerConfig(handle) {
    const route = new Router();

    if(process.env.NODE_ENV === 'development') {
        // 两种都可以，http-proxy方便一些
        // https://github.com/popomore/koa-proxy
        // const proxy = require('koa-proxy');

        // https://github.com/http-party/node-http-proxy
        const {createProxyServer} = require('http-proxy');
    
        route.all(
            ['/postapi/*'],
            ctx => {
                console.log('进行转发......');

                const proxyServer = createProxyServer({
                    target: 'http://127.0.0.1:8088'
                })

                // 监听proxy错误信息
                proxyServer.on('error', error => {
                    console.log(error, 'proxy报错了');
                })

                // 代理服务器返回的信息 proxy res
                // proxyServer.on('proxyRes', function (proxyRes, req, res) {
                //     console.log('RAW Response from the target', JSON.stringify(proxyRes.headers, true, 2));
                //     console.log(res, 'res');
                // });

                // 监听websocket的启动
                // proxyServer.on('open', function (proxySocket) {
                //     // listen for messages coming FROM the target here
                //     // proxySocket.on('data', hybiParseAndLogMessage);
                // });

                // 监听websocket的断开
                // proxyServer.on('close', function (res, socket, head) {
                //     // view disconnected websocket connections
                //     console.log('Client disconnected');
                // });

                // 告诉koa http的返回信息已经被处理的，不需要koa再去处理body
                ctx.respond = false;

                // 进行代理请求 返回数据
                proxyServer.web(ctx.req, ctx.res)
            }
            // koa-proxy写法
            // proxy({
            //     host: 'http://127.0.0.1:8088'
            // })
        )
    }

    route.get('*', async (ctx, next) => {
        // 处理所有get请求，主要是pages的ssr页面

        const matched = route.match(ctx.path, ctx.method);
        // 当该请求会被其他路由处理时直接进入下一个中间件
        if (matched.path.length > 1) {
            return next();
        }
        // 返回数据给nextjs
        await handle(ctx.req, ctx.res);
        // 告诉koa http的返回信息已经被处理的，不需要koa再去处理body
        ctx.respond = false;
        // 进入下一个中间件
        return next();
    });

    return route;
};

module.exports = routerConfig;

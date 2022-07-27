const Koa = require('koa');
const next = require('next');

const routerConfig = require('./routerConfig');

async function createServer () {

    // console.log(process.env.NODE_ENV, 'process.env.NODE_ENV');
    const dev = process.env.NODE_ENV !== 'production';
    const app = next({dev});
    const handle = app.getRequestHandler();

    // app.prepare()之后进行server的服务操作
    await app.prepare();
    const server = new Koa();

    // 配置proxy代理服务器转发
    server.use(routerConfig(handle).routes());

    server.use(async (ctx, next) => {
        
        await handle(ctx.req, ctx.res)
        ctx.respond = false;
    })

    server.listen(3000, () => {
        console.log('koa服务启动成功！');
    });
}

createServer();


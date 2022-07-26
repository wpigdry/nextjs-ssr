const Koa = require('koa');
const next = require('next');

async function createServer () {

    const dev = process.env.NODE_ENV !== 'production';
    const app = next({dev});
    const handle = app.getRequestHandler();

    // app.prepare()之后进行server的服务操作
    await app.prepare();
    const server = new Koa();

    server.use(async (ctx, next) => {
        console.log(ctx.req, ctx.res, '*');
        
        await handle(ctx.req, ctx.res)
        ctx.respond = false;
    })

    server.listen(3000, () => {
        console.log('koa服务启动成功！');
    });
}

createServer();


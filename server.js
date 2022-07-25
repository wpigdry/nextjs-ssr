const Koa = require('koa');
const next = require('next');

async function createServer () {

    const dev = process.env.RUN_NODE_ENV === 'development';
    const app = next({dev});
    const handle = app.getRequestHandler();

    await app.prepare().then();

    const server = new Koa();

    server.get('*', (req, res) => {
        console.log(req, res, '*');
        
        return handle(req, res)
    })

    await new Promise(resolve => {
        server.listen(3000, () => {
              console.log('koa服务启动成功！');
        });
    });
}

createServer();


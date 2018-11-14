const api = new (require('koa-router'))({ prefix: '/api' });
module.exports = api
    .get('/', ctx => {
    ctx.body = { test: 'OK' };
});

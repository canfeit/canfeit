/**
 * @file 服务端入口文件
 * @name server.js
 * @author Wang Jianhui <jianhui.wang@hpe.com>
 * @copyright DXC 2017
 * @version 1.0.0
 */
// Koa：nodejs的web开发框架
const app = new (require("koa"))();
let connLimit = 30000; // 并发数
// 全局错误处理,并发量控制
app.use(async (ctx, next) => {
  if (connLimit) {
    connLimit--;
    // console.log('req num:', 30000 - connLimit)
    // 项目中不要使用ctx.throw抛出异常,使用ctx.body就地返回
    // 不要使用 console.error输出异常
    // 不要catch不能处理的异常
    await next();
    connLimit++;
  } else {
    ctx.status = 413;
    ctx.body = { status: 2, data: { msg: "We are too popular to busy!" } };
  }
});
// 单用户访问限制
if (process.env.REDIS) {
  let limit = false;
  const redis = new (require("ioredis"))({
    autoResubscribe: false,
    autoResendUnfulfilledCommands: false,
    enableOfflineQueue: false,
    retryStrategy: () => 60000 // 1分钟
  });
  redis.on("error", () => {
    limit = false;
  });
  redis.on("connect", () => {
    limit = true;
  });
  // 每ip每分钟100(每个ip并发连接数)连接
  app.use(
    require("koa-ratelimit")({
      db: redis,
      duration: 60000,
      errorMessage: "Sometimes You Just Have to Slow Down.",
      id: ctx => (limit ? ctx.ip : false),
      max: 100
    })
  );
}
// 启用gzip压缩，提高数据传输效率
app.use(
  require("koa-compress")({
    threshold: 1024 * 1024
  })
);
// cors
app.use(require("kcors")());
// 缓存协商,根据etag判断待传输的数据有没有更新，没有更新返回304 Not Modified，不传输数据
app.use(require("koa-conditional-get")());
// 给传输的数据添加标识
app.use(require("koa-etag")());
// 解析请求body,100M大小限制
app.use(
  require("koa-bodyparser")({
    formLimit: 1024 * 1024 * 100,
    jsonLimit: 1024 * 1024 * 100,
    textLimit: 1024 * 1024 * 100
  })
);
// Koa 日志输出
if (process.env.NODE_LOG) app.use(require("koa-logger")());
// 引入自定义路由模块
app.use(require("./router/api").routes());
module.exports = app;
// 在指定端口启动服务
app.listen(process.env.PORT || 3000);
console.log(
  `Server running on port ${process.env.PORT || 3000}!\nnode version:${
    process.version
  }`
); // 字符串模板

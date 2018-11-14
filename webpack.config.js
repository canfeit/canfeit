// webpack(js模块加载器)配置文件
const webpack = require("webpack");
module.exports = {
  mode: "production",
  entry: {
    sample: "./sample/lib/assembly/sample.ts" // webpack 入口文件
  },
  output: {
    filename: "./[name]/lib/assembly/[name].js",
    path: __dirname
  },
  resolve: {
    extensions: [".js"] // 自动扩展文件后缀名，require模块可以省略不写后缀名
  },
  module: {
    rules: [
      {
        test: /\.ts?$/, // 正则表达式匹配要处理的文件
        include: /assembly/,
        exclude: /(node_modules|bower_components)/, // 排除不处理的目录
        use: "./as-loader" // 要使用的 loader,loader是模块/资源加载转换器,通过 require 加载任意类型模块或文件，解析打包成js文件
      }
    ]
  },
  plugins: [
    // plugin比loader功能更强大，能使用更多的wepack api
    new webpack.DefinePlugin({
      // 定义编译时全局常量
      "process.env": {
        // 环境变量
        NODE_ENV: JSON.stringify("production")
      }
    })
  ]
};
console.log("########################################");
console.log("webpack 配置");
console.log("########################################");

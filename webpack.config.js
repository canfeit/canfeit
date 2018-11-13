module.exports = {
  mode: "production",
  entry: {
    sample: "./sample/lib/assembly/sample.ts"
  },
  output: {
    filename: "./[name]/lib/assembly/[name].js",
    path: __dirname
  },
  module: {
    rules: [
      {
        test: /\.ts?$/,
        include: /assembly/,
        use: "./as-loader"
      }
    ]
  }
};
console.log("########################################");
console.log("webpack 配置");
console.log("########################################");

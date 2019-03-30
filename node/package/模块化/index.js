console.log("index模块定义了World方法");
console.log("index模块导入了hello模块");
const sayHello = require("./hello");
exports.world = function() {
  console.log("World");
};
sayHello();

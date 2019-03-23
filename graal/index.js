//启动:node --jvm index
const http = require("http");

http
  .createServer(function(request, response) {
    response.writeHead(200, { "Content-Type": "text/html" });
    var text = "Hello World!";
    const BigInteger = Java.type("java.math.BigInteger");
    text += BigInteger.valueOf(2)
      .pow(100)
      .toString(16);
    response.end(text);
  })
  .listen(8000, function() {
    console.log("Graal.js server running at http://127.0.0.1:8000/");
  });

const http = require("httpx");
require("./package/demo");

const server = http.createServer((req, res) => {
  res.end("hello kity");
});
server.listen(3000, () => console.log("Server listening 3000"));

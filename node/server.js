require("http")
  .createServer((req, res) => {
    res.end("hello kity");
  })
  .listen(3000, () => console.log("Server listening 3000"));

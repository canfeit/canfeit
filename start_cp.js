process.on("message", ({ type }) => {
  switch (type) {
    case "exit":
      process.exit(1);
      break;
  }
});

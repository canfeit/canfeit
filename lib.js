const { join } = require("path");
const { fork } = require("child_process");
let appium;
exports.request = require("request").defaults({
  timeout: 3000,
  forever: true,
  json: true,
  baseUrl: "http://localhost:4444/wd/hub/session/1/"
});
exports.startAppium = mainWindow => {
  appium = fork(join(__dirname, "..", "..", "static", "wappium", "start_cp"));
  appium.on("message", msg => mainWindow.webContents.send("log", msg));
};
exports.stopAppium = () => {
  if (appium) {
    appium.send({ type: "exit" });
    appium.kill();
    appium.disconnect();
    appium = null;
  }
};

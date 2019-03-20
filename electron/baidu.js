// @ts-check
"use strict";
const { app, BrowserWindow } = require("electron");
app.once("ready", () => {
  const mainWindow = new BrowserWindow({
    show: false,
    webPreferences: {
      nodeIntegration: false
    }
  });
  mainWindow.loadURL("http://baidu.com");
  mainWindow.maximize();
  mainWindow.once("ready-to-show", mainWindow.show);
  mainWindow.once("close", app.quit);
});

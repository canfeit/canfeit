// @ts-check
"use strict";
console.log("主进程入口模块");
const { fork, spawnSync } = require("child_process");
const { app, Menu, BrowserWindow, ipcMain } = require("electron");
const menu = require("./menu");
const upgrade = require("./upgrade");
const { join } = require("path");
let mainWindow;
let deviceWin;
let cp;
let baseUrl = process.defaultApp
  ? "http://localhost:8000"
  : `file://${__dirname}/../renderer/index.html`;
if (process.platform !== "win32") {
  const { stdout } = spawnSync("/bin/bash", ["-lc", "env"]);
  if (stdout) {
    const ret = {};
    for (const line of stdout.toString().split("\n")) {
      const parts = line.split("=");
      ret[parts.shift()] = parts.join("=");
    }
    Object.assign(process.env, ret);
  }
}
const openDeviceWindow = (_, device) => {
  const display = require("electron").screen.getPrimaryDisplay();
  const [width, height] = device.screen.split("x");
  console.log("创建设备窗口 Renderer");
  deviceWin = new BrowserWindow({
    title: "脚本录制",
    // parent: mainWindow,
    autoHideMenuBar: true,
    show: false,
    height: display.workArea.height,
    x: display.workArea.width + display.workArea.x,
    y: display.workArea.y,
    resizable: false,
    alwaysOnTop: true,
    maximizable: false,
    fullscreenable: false,
    webPreferences: {
      // 生产环境禁用 devTools
      // devTools: false,
      nodeIntegrationInWorker: true
    }
  });
  // if (process.defaultApp) deviceWin.webContents.openDevTools();
  deviceWin.once("closed", () => {
    deviceWin = null;
  });
  ipcMain.once("canvasHeight", (_, canvasHeight) => {
    const DEVICE_WINDOW_WIDTH = Math.round((canvasHeight * width) / height);
    deviceWin.setBounds({
      x: display.workArea.width + display.workArea.x - DEVICE_WINDOW_WIDTH,
      y: display.workArea.y,
      width: DEVICE_WINDOW_WIDTH,
      height: display.workArea.height
    });
    deviceWin.show();
    //test log
    {
      deviceWin.webContents.send("deviceWinShowed", { width, height });
      // 屏幕尺寸(屏幕对角线长度)in
      const inch = 15.6;
      // 屏幕分辨率(屏幕宽和高上所拥有像素数)px
      const pc_pixel = display.size;
      // 屏幕像素密度(屏幕上一个对角线为1英寸的正方形所拥有的像素数,衡量清晰度)ppi=
      Math.sqrt(Math.pow(pc_pixel.width, 2) + Math.pow(pc_pixel.height, 2)) /
        inch;
      console.log("屏幕分辨率", display.size);
      console.log("屏幕内容区（去掉win任务栏/mac菜单栏）", display.workArea);
      console.log(
        "设备分辨率",
        { width: +width, height: +height },
        height / width
      );
      console.log("设备窗口指定", {
        x: display.workArea.width + display.workArea.x - DEVICE_WINDOW_WIDTH,
        y: display.workArea.y,
        width: DEVICE_WINDOW_WIDTH,
        height: display.workArea.height
      });
      console.log("设备窗口", deviceWin.getBounds());
      console.log("设备窗口内容区", deviceWin.getContentBounds());
      console.log("设备窗口屏幕大小指定", {
        width: DEVICE_WINDOW_WIDTH,
        height: canvasHeight
      });
      console.log("设备屏幕压缩比例(计划)", {
        width: width / DEVICE_WINDOW_WIDTH,
        height: height / canvasHeight
      });
    }
  });
  deviceWin.loadURL(`${baseUrl}`);
};
app.commandLine.appendSwitch("enable-experimental-web-platform-features");
app.once("ready", () => {
  mainWindow = new BrowserWindow();
  mainWindow.maximize();
  mainWindow.loadURL(baseUrl);
  mainWindow.once("close", () => {
    deviceWin && deviceWin.close();
  });
  // @ts-ignore
  Menu.setApplicationMenu(Menu.buildFromTemplate(menu));
  upgrade();
  if (process.defaultApp) {
    const installer = require("electron-devtools-installer");
    Promise.all([
      installer.default(installer.REACT_DEVELOPER_TOOLS),
      installer.default(installer.REDUX_DEVTOOLS)
    ])
      .then(name => console.log(`Added Extension:  ${name}`))
      .catch(err => console.log("An error occurred: ", err));
    // mainWindow.webContents.openDevTools();
  }
});
app.once("before-quit", () => {
  console.log("准备退出");
});
app.once("window-all-closed", app.quit);

console.log("菜单栏模块");
const { app, shell, dialog } = require("electron");
const { autoUpdater } = require("electron-updater");
module.exports = [
  {
    label: app.getName(),
    submenu: [
      {
        label: "云测平台",
        click() {
          shell.openExternal("http://cloud.testwa.com/");
        }
      },
      {
        label: "在线文档",
        click() {
          shell.openExternal("https://github.com/canfeit/testwa#readme");
        }
      },
      {
        label: "互动社区",
        click() {
          shell.openExternal("http://forum.testwa.com/");
        }
      },
      {
        label: "意见反馈",
        click() {
          shell.openExternal("https://github.com/canfeit/testwa/issues");
        }
      },
      { type: "separator" },
      {
        label: "关于TestWa",
        role: "help",
        click: () => {
          dialog.showMessageBox({
            message: `Testwa 版本 ${app.getVersion()}
♥Testwa 的诞生离不开以下开源项目♥
Electron ${process.versions.electron}
Chromium ${process.versions.chrome}
Node.js ${process.versions.node}
V8 ${process.versions.v8}`
          });
        }
      },
      { label: "已是最新", id: "isLatest", enabled: false },
      { label: "正在下载更新", id: "downloadingUpdate", enabled: false },
      {
        label: "重启并安装更新",
        id: "restartToUpdate",
        click: () => autoUpdater.quitAndInstall()
      }
    ]
  },
  {
    label: "编辑",
    submenu: [
      { label: "撤销", role: "undo" },
      { label: "恢复", role: "redo" },
      { type: "separator" },
      { label: "剪切", role: "cut" },
      { label: "复制", role: "copy" },
      { label: "粘贴", role: "paste" },
      { label: "删除", role: "delete" },
      { label: "全选", role: "selectall" }
    ]
  },
  {
    label: "窗口",
    role: "window",
    submenu: [
      { label: "刷新", role: "reload" },
      { label: "切换全屏", role: "togglefullscreen" },
      { label: "调试", role: "toggledevtools" },
      { type: "separator" },
      { label: "最小化", role: "minimize" },
      { label: "退出", role: "quit" }
    ]
  }
];

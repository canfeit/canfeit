console.log("自动更新模块");
const { autoUpdater } = require("electron-updater");
const { Menu, app } = require("electron");
app.setAppUserModelId("com.testwa.desktop");
app.setAsDefaultProtocolClient("testwaDesktop");
module.exports = () => {
  const upgradeItems = [
    Menu.getApplicationMenu().getMenuItemById("isLatest"),
    Menu.getApplicationMenu().getMenuItemById("downloadingUpdate"),
    Menu.getApplicationMenu().getMenuItemById("restartToUpdate")
  ];
  const updateMenu = id => {
    for (const upgradeItem of upgradeItems) {
      // @ts-ignore
      upgradeItem.visible = upgradeItem.id === id;
    }
  };
  updateMenu("isLatest");
  autoUpdater.on("update-available", () => {
    updateMenu("downloadingUpdate");
  });

  autoUpdater.on("update-not-available", () => {
    updateMenu("isLatest");
  });

  autoUpdater.on("update-downloaded", () => {
    updateMenu("restartToUpdate");
  });

  autoUpdater.on("error", () => {
    updateMenu("isLatest");
  });
  console.log("准备检查更新");
  autoUpdater.checkForUpdatesAndNotify();
};

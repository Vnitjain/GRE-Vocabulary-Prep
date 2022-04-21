const { app, BrowserWindow, Menu, ipcMain, dialog } = require("electron");
const { ConfigClass } = require("./configClass");
const fs = require("fs");
const path = require("path");
const configClass = new ConfigClass();
function createWindow() {
  const mainWindow = new BrowserWindow({
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });
  mainWindow.loadFile("index.html");
  const menuTemplate = [
    {
      label: "File",
      submenu: [
        {
          label: "Select JSON",
          click: async () => {
            const { canceled, filePaths } = await dialog.showOpenDialog();
            if (canceled) {
              return;
            } else {
              try {
                configClass.writeConfig("sourceJsonPath", filePaths[0]);
                const sourceJsonContents = JSON.parse(
                  fs.readFileSync(filePaths[0])
                );
                mainWindow.webContents.send("openFile", sourceJsonContents);
              } catch (error) {
                console.error(error);
              }
            }
          },
        },
      ],
    },
  ];
  Menu.setApplicationMenu(Menu.buildFromTemplate(menuTemplate));
  mainWindow.webContents.openDevTools();
  mainWindow.on("ready-to-show", () => {
    const configContents = configClass.configContents;
    if (configContents !== null) {
      const sourceJsonPath = configClass.readConfig("sourceJsonPath");
      try {
        const sourceJsonContents = JSON.parse(fs.readFileSync(sourceJsonPath));
        mainWindow.webContents.send("openFile", sourceJsonContents);
      } catch (error) {
        console.error(error);
      }
    }
  });
}
app.whenReady().then(() => {
  createWindow();
  app.on("activate", function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});
app.on("window-all-closed", function () {
  if (process.platform !== "darwin") app.quit();
});

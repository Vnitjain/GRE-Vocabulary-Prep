const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("native", {
  handleOpenFile: (callback) => ipcRenderer.on("openFile", callback),
});

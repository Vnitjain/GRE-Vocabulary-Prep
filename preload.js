const { contextBridge, ipcRenderer } = require("electron");
contextBridge.exposeInMainWorld("myAPI", {
  desktop: true,
});
contextBridge.exposeInMainWorld("electronAPI", {
  setTitle: (title) => {
    ipcRenderer.send("setTitleFunction", title);
  },
});
window.addEventListener("DOMContentLoaded", () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector);
    if (element) {
      element.innerText = text;
    }
  };
  for (const dependency of ["chrome", "node", "electron"]) {
    replaceText(`${dependency}-version`, process.versions[dependency]);
  }
});

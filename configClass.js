const { app } = require("electron");
const path = require("path");
const fs = require("fs");
class ConfigClass {
  constructor() {
    this.filePath = path.join(app.getPath("userData"), "config.json");
    this.configContents = this.checkIfConfigExists();
  }
  checkIfConfigExists() {
    try {
      const fileContents = fs.readFileSync(this.filePath);
      return fileContents.length !== 0
        ? JSON.parse(fs.readFileSync(this.filePath))
        : null;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
  readConfig(key) {
    return this.configContents !== null ? this.configContents[key] : null;
  }
  writeConfig(key, value) {
    if (this.configContents == null) {
      this.configContents = {};
    }
    this.configContents[key] = value;
    try {
      fs.writeFileSync(this.filePath, JSON.stringify(this.configContents));
    } catch (error) {
      console.error(error);
    }
  }
}
module.exports = { ConfigClass };

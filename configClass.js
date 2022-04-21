class configClass {
  constructor() {
    this.configExists = this.checkIfConfigExists();
  }
  checkIfConfigExists() {
    const userDataPath = app.getPath("userData");
    const fullUserDataPath = path.join(userDataPath, "config.json");
    try {
      const configJson = JSON.parse(fs.readFileSync(fullUserDataPath));
      return configJson;
    } catch (error) {
      return null;
    }
  }
  readConfig(configJson, key) {
    return configJson[key];
  }
  writeConfig(configJson, key, value, filePath) {
    configJson[key] = value;
    fs.writeFileSync(filePath, configJson);
  }
}

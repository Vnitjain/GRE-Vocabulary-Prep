window.native.handleOpenFile((event, args) => {
  console.log(args);
  if (args !== null) {
    document
      .getElementsByClassName("file-selected")[0]
      .classList.remove("hidden");
    document
      .getElementsByClassName("no-file-selected")[0]
      .classList.add("hidden");
  }
});

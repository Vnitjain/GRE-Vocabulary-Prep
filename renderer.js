console.log("in renderer js");
const setButton = document.getElementById("btn");
const titleInput = document.getElementById("title");

setButton.addEventListener("click", () => {
  const title = titleInput.value;
  console.log(title);
  window.electronAPI.setTitle(title);
});

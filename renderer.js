var jsonContentObj;
document
  .getElementsByClassName("next")[0]
  .addEventListener("click", function () {
    setWord("next");
  });
document
  .getElementsByClassName("previous")[0]
  .addEventListener("click", function () {
    setWord("previous");
  });
document
  .getElementsByClassName("reveal")[0]
  .addEventListener("click", function () {
    changeCardState();
  });
window.native.handleOpenFile((event, args) => {
  if (args !== null && args.length !== 0) {
    jsonContentObj = new JsonContent(args);
    document
      .getElementsByClassName("file-selected")[0]
      .classList.remove("hidden");
    document
      .getElementsByClassName("no-file-selected")[0]
      .classList.add("hidden");
  }
  setWord("current");
});
function setWord(mode) {
  var current;
  switch (mode) {
    case "current":
      current = jsonContentObj.getCurrent();
      break;
    case "next":
      current = jsonContentObj.getNext();
      break;
    case "previous":
      current = jsonContentObj.getPrevious();
      break;
    default:
      break;
  }
  Object.keys(current).forEach((value) => {
    document.getElementsByClassName(value)[0].innerText = current[value];
  });
}
function changeCardState() {
  document
    .getElementsByClassName("flashcard-text")[0]
    .classList.toggle("hidden");
  document
    .getElementsByClassName("flashcard-example")[0]
    .classList.toggle("hidden");
}
class JsonContent {
  constructor(args) {
    this.jsonContent = args;
    this.extractWordsFromList();
    this.currentWordIndex = 0;
  }
  getJsonContent() {
    return this.jsonContent;
  }
  getRandomList() {
    return this.randomList;
  }
  extractWordsFromList() {
    let wordList = [];
    this.jsonContent.forEach((outerListItem) => {
      Object.keys(outerListItem).forEach((topic) => {
        outerListItem[topic].forEach((word) => {
          wordList.push(word);
        });
      });
    });
    this.randomList = wordList.sort(() => {
      return Math.random() - 0.5;
    });
    return this.randomList;
  }
  getNext() {
    this.currentWordIndex =
      (this.currentWordIndex + 1) % this.randomList.length;
    return this.randomList[this.currentWordIndex];
  }
  getPrevious() {
    this.currentWordIndex =
      (this.currentWordIndex - 1) % this.randomList.length;
    return this.randomList[this.currentWordIndex];
  }
  getCurrent() {
    return this.randomList[this.currentWordIndex];
  }
}

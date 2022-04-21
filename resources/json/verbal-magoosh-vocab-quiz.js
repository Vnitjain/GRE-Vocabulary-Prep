var vocabJson = [];
var magooshScript = function () {
  var cardFooter = $(
    "body > div > div > div > div.flashcard-container.u-margin-V-m > div > div.front.card.flashcard-card > a.card-footer.text-center"
  );
  cardFooter.click();
  console.log(vocabJson);

  var word = $(
    "body > div > div > div > div.flashcard-container.u-margin-V-m > div > div.back.card.flashcard-card > div > h3"
  ).text();
  var text = $(
    "body > div > div > div > div.flashcard-container.u-margin-V-m > div > div.back.card.flashcard-card > div > div.flashcard-text"
  ).text();
  var example = $(
    "body > div > div > div > div.flashcard-container.u-margin-V-m > div > div.back.card.flashcard-card > div > em"
  ).text();
  vocabJson.push({
    "flashcard-word": word,
    "flashcard-text": text,
    "flashcard-example": example,
  });
  var accept = $(
    "body > div > div > div > div.flashcard-container.u-margin-V-m > div > div.back.card.flashcard-card > a.card-footer.card-footer-success.text-center"
  );
  accept.click();
  if (vocabJson.length !== 51) {
    setTimeout(magooshScript, 1000);
  }
};
magooshScript();

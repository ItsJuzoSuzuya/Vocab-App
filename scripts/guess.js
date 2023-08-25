var savedWords = JSON.parse(words);
var shuffeldWords = shuffle(Object.keys(savedWords));
var wordMap = new Map();

shuffeldWords.forEach((key) => {
  wordMap.set(key, savedWords[key]);
});

var currentKey;

var guessingOptions = [];

[values, keys] = separateKeyValuePairs(wordMap);

function loadGuessingGame() {
  currentKey = keys[0].text;

  const foreign = document.querySelector(".foreignWord");
  const guessing = document.querySelector(".guessingOptions");

  while (foreign.firstChild) {
    foreign.removeChild(foreign.firstChild);
  }

  while (guessing.firstChild) {
    guessing.removeChild(guessing.firstChild);
  }

  guessingOptions = [];

  var foreignWord = document.createElement("button");
  foreignWord.innerText = currentKey;
  foreign.appendChild(foreignWord);

  for (let i = 0; i < 4 && i < values.length; i++) {
    guessingOptions.push(values[i].text);
  }

  shuffle(guessingOptions);

  guessingOptions.forEach((option) => {
    var guessingBTN = document.createElement("button");
    guessingBTN.innerText = option;
    guessingBTN.onclick = function () {
      checkForPair(this, option);
    };
    guessing.appendChild(guessingBTN);
  });
}

function checkForPair(button, word) {
  if (wordMap.get(currentKey).includes(word)) {
    keys.shift();
    if (keys.length > 0) {
      loadGuessingGame();
    } else console.log("You Won!");
  } else {
    button.style.backgroundColor = "red";

    setTimeout(() => {
      button.style.backgroundColor = "";
    }, 1000);
  }
}

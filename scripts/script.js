var urlParams = new URLSearchParams(window.location.search);

var currentLanguage = urlParams.get("lang");
var currentTopic = urlParams.get("topic");
var currentIndex = 0;

var words = localStorage.getItem(currentLanguage + currentTopic + "Words");
var topics = localStorage.getItem(currentLanguage + "Topics");
var languages = localStorage.getItem("languages");

function navigateTo(url) {
  if (event.target.classList.contains("languageButton")) {
    currentLanguage = event.target.innerText;
    window.location.href = url + "?lang=" + encodeURIComponent(currentLanguage);
  } else if (event.target.classList.contains("topicButton")) {
    currentTopic = event.target.innerText;
    window.location.href =
      url +
      "?lang=" +
      encodeURIComponent(currentLanguage) +
      "&topic=" +
      encodeURIComponent(currentTopic);
  } else if (currentTopic != null) {
    window.location.href =
      url +
      "?lang=" +
      encodeURIComponent(currentLanguage) +
      "&topic=" +
      encodeURIComponent(currentTopic);
  } else if (currentLanguage != null) {
    window.location.href = url + "?lang=" + encodeURIComponent(currentLanguage);
  } else {
    window.location.href = url;
  }
}

function saveNewLanguage(button) {
  var buttonText = button.innerText.trim();

  var storedValues = languages ? JSON.parse(languages) : [];

  if (!storedValues.includes(buttonText)) {
    storedValues.push(buttonText);
    localStorage.setItem("languages", JSON.stringify(storedValues));
  }
}

function loadLanguageButtons() {
  if (languages) {
    var addButton = document.querySelector(".addButton");
    var savedValues = JSON.parse(languages);

    savedValues.forEach(function (buttonText) {
      var newButton = document.createElement("button");
      newButton.className = "button languageButton";
      newButton.innerText = buttonText;
      newButton.onclick = function () {
        navigateTo("topicSite.html");
      };
      addButton.parentNode.insertBefore(newButton, addButton);
    });
  }
}

function saveTopic(input) {
  var inputText = input.value.trim();

  var storedValues = topics ? JSON.parse(topics) : [];

  storedValues.push(inputText);

  localStorage.setItem(
    currentLanguage + "Topics",
    JSON.stringify(storedValues)
  );
}

function saveWord(input1, input2) {
  var foreignWord = input1.value.trim();
  var translation = input2.value.trim();

  if (
    foreignWord.replaceAll(/\s/g, "") != "" &&
    translation.replaceAll(/\s/g, "") != ""
  ) {
    var storedValues = words ? JSON.parse(words) : {};

    storedValues[foreignWord] = translation;

    localStorage.setItem(
      currentLanguage + currentTopic + "Words",
      JSON.stringify(storedValues)
    );
  }
}

function loadTopics() {
  if (topics) {
    var addButton = document.querySelector(".addButton");
    var savedValues = JSON.parse(topics);

    savedValues.forEach(function (topic) {
      var newButton = document.createElement("button");
      newButton.className = "button topicButton";
      newButton.innerText = topic;
      newButton.onclick = function () {
        navigateTo("modeSelection.html");
      };
      addButton.parentNode.insertBefore(newButton, addButton);
    });
  }
}

function loadWords() {
  if (words) {
    var addButton = document.querySelector(".addButton");
    var savedValues = JSON.parse(words);

    Object.entries(savedValues).forEach(function ([key, value]) {
      var newButton = document.createElement("button");
      newButton.className = "button wordButton";

      var upperText = document.createElement("span");
      upperText.className = "upperText";
      upperText.innerText = key;

      var lowerText = document.createElement("span");
      lowerText.className = "lowerText";
      lowerText.innerText = value;

      newButton.appendChild(upperText);
      newButton.appendChild(lowerText);

      newButton.onclick = function () {
        navigateTo("wordSite.html");
      };
      addButton.parentNode.insertBefore(newButton, addButton);
    });
  }
}

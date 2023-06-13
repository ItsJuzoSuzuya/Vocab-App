import Hammer from 'hammerjs';

var hammertime = new Hammer(document);
hammertime.on('swipeleft', function(event) {
  swipeLeft();
});

var urlParams = new URLSearchParams(window.location.search);
var currentLanguage;
var currentIndex = 0;

function navigateToNewSite(url) {
  currentLanguage = urlParams.get('lang');
  currentTopic = urlParams.get('topic');

  if (event.target.classList.contains('languageButton')) {
    currentLanguage = event.target.innerText;
    window.location.href = url + '?lang=' + encodeURIComponent(currentLanguage);
  }else if(event.target.classList.contains('topicButton')){
    currentTopic = event.target.innerText;
    window.location.href = url + '?lang=' + encodeURIComponent(currentLanguage) + '&topic=' + encodeURIComponent(currentTopic);
  }else if(currentTopic != null){
    window.location.href = url + '?lang=' + encodeURIComponent(currentLanguage) + '&topic=' + encodeURIComponent(currentTopic);
  }else if(currentLanguage != null){
    window.location.href = url + '?lang=' + encodeURIComponent(currentLanguage);
  } else {
    window.location.href = url;
  }
}

function saveButtonText(button){
    var buttonText = button.innerText.trim();
  
    var storedText = localStorage.getItem('languages');
    var storedValues = storedText ? JSON.parse(storedText) : [];

    if (!storedValues.includes(buttonText)) {
      storedValues.push(buttonText);
      localStorage.setItem('languages', JSON.stringify(storedValues));
    }
} 

function loadLanguageButtons() {
    var languages = localStorage.getItem('languages');
  
    if (languages) {
      var addButton = document.querySelector('.addButton');
      var savedValues = JSON.parse(languages);
  
      savedValues.forEach(function(buttonText) {
        var newButton = document.createElement('button');
        newButton.className = 'button languageButton';
        newButton.innerText = buttonText;
        newButton.onclick = function() {
          navigateToNewSite('topicSite.html');
        };
        addButton.parentNode.insertBefore(newButton, addButton);
      });
    }
  }

  function saveTopic(input){
    var currentLanguage = urlParams.get('lang');

    var inputText = input.value.trim();
  
    var storedText = localStorage.getItem(currentLanguage + 'Topics');
    var storedValues = storedText ? JSON.parse(storedText) : [];
  
    storedValues.push(inputText);
  
    localStorage.setItem(currentLanguage + 'Topics', JSON.stringify(storedValues));
  }

  function saveWord(input1, input2){
    var currentLanguage = urlParams.get('lang');
    var currentTopic = urlParams.get('topic');

    var foreignWord = input1.value.trim();
    var translation = input2.value.trim();
  
    var storedText = localStorage.getItem(currentLanguage +  currentTopic + 'Words');
    var storedValues = storedText ? JSON.parse(storedText) : {};

    storedValues[foreignWord] = translation;
  
    localStorage.setItem(currentLanguage + currentTopic + 'Words', JSON.stringify(storedValues));
  }

function loadTopics(){
  var currentLanguage = urlParams.get('lang');
  var topics = localStorage.getItem(currentLanguage + 'Topics');

  if (topics) {
    var addButton = document.querySelector('.addButton');
    var savedValues = JSON.parse(topics);

    savedValues.forEach(function(topic) {
      var newButton = document.createElement('button');
      newButton.className = 'button topicButton';
      newButton.innerText = topic;
      newButton.onclick = function() {
        navigateToNewSite('modeSelection.html');
      };
      addButton.parentNode.insertBefore(newButton, addButton);
    });
  }
}

  function loadWords(){
    var currentLanguage = urlParams.get('lang');
    var currentTopic = urlParams.get('topic');

    var topics = localStorage.getItem(currentLanguage + currentTopic + 'Words');
  
    if (topics) {
      var addButton = document.querySelector('.addButton');
      var savedValues = JSON.parse(topics);
  
      Object.entries(savedValues).forEach(function([key, value]) {
        console.log(key + value);

        var newButton = document.createElement('button');
        newButton.className = 'button wordButton';

        var upperText = document.createElement('span');
        upperText.className = 'upperText';
        upperText.innerText = key;
      
        var lowerText = document.createElement('span');
        lowerText.className = 'lowerText';
        lowerText.innerText = value;

        newButton.appendChild(upperText);
        newButton.appendChild(lowerText);

        newButton.onclick = function() {
          navigateToNewSite('wordSite.html');
        };
        addButton.parentNode.insertBefore(newButton, addButton);
      });
    }
}


function loadFirstBigWord(){
    var currentLanguage = urlParams.get('lang');
    var currentTopic = urlParams.get('topic');

    var topics = localStorage.getItem(currentLanguage + currentTopic + 'Words');

    if (topics) {
      var savedValues = JSON.parse(topics);
  
      var firstEntry = Object.entries(savedValues)[0];
      var key = firstEntry[0];
      var value = firstEntry[1];

      var foreignWord = document.createElement('input');
      foreignWord.className = 'bigWord';
      foreignWord.value = key;
      foreignWord.readOnly = true;

      var translation = document.createElement('input');
      translation.className = 'bigWord';
      translation.value = value;
      translation.readOnly = true;

      var mainDiv = document.querySelector('.main');
      mainDiv.appendChild(foreignWord);
      mainDiv.appendChild(translation);
    }      
}

function swipeLeft() {
    currentIndex++;
  if (currentIndex >= words.length) {
    currentIndex = 0;
  }

  var mainDiv = document.querySelector('main');
  mainDiv.style.transform = `translateY(-${currentIndex * 60}px)`;
  loadNextBigCard()
}

function loadNextBigCard(){
  
  Object.entries(savedValues)[currentIndex];

  var foreignInput = document.querySelector('.bigWord:first-child');
  var translationInput = document.querySelector('.bigWord:last-child');

  foreignInput.value = words[currentIndex].foreign;
  translationInput.value = words[currentIndex].translation;
}

document.addEventListener('DOMContentLoaded', function() {
  document.addEventListener('swipeleft', swipeLeft);
});
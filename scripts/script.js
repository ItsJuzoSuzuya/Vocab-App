var urlParams = new URLSearchParams(window.location.search);

var words = localStorage.getItem(currentLanguage + currentTopic + 'Words');
var topics = localStorage.getItem(currentLanguage + 'Topics');
var languages = localStorage.getItem('languages');

var currentLanguage;
var currentTopic;
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
  
    var storedValues = languages ? JSON.parse(languages) : [];

    if (!storedValues.includes(buttonText)) {
      storedValues.push(buttonText);
      localStorage.setItem('languages', JSON.stringify(storedValues));
    }
} 

function loadLanguageButtons() {  
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
    var inputText = input.value.trim();
  
    var storedValues = topics ? JSON.parse(topic) : [];
  
    storedValues.push(inputText);
  
    localStorage.setItem(currentLanguage + 'Topics', JSON.stringify(storedValues));
  }

  function saveWord(input1, input2){
    var foreignWord = input1.value.trim();
    var translation = input2.value.trim();
  
    var storedValues = words ? JSON.parse(words) : {};

    storedValues[foreignWord] = translation;
  
    localStorage.setItem(currentLanguage + currentTopic + 'Words', JSON.stringify(storedValues));
  }

function loadTopics(){
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
    if (words) {
      var addButton = document.querySelector('.addButton');
      var savedValues = JSON.parse(words);
  
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

function swipeLeft() {
  var savedValues = JSON.parse(words);

  currentIndex++;
  if (currentIndex >= Object.entries(savedValues).length) {
    currentIndex = 0;
  }
  loadNextBigCard(false, 'left');
}

function swipeRight() {
  var savedValues = JSON.parse(words);

  currentIndex--;
  if (currentIndex < 0) {
    currentIndex = Object.entries(savedValues).length - 1;
  }
  loadNextBigCard(false, 'right');
}

function loadNextBigCard(first, direction) {
  var savedValues = JSON.parse(words);
  var currentEntry = Object.entries(savedValues)[currentIndex];

  var newForeignInput = document.createElement('input');
  newForeignInput.className = 'bigWord';
  var newTranslationInput = document.createElement('input');
  newTranslationInput.className = 'bigWord';

  newForeignInput.value = currentEntry[0];
  newTranslationInput.value = currentEntry[1];

  var foreignDiv = document.querySelector('.foreign');
  var translationDiv = document.querySelector('.translation');
  var existingInputs = document.querySelectorAll('.bigWord');

  if (existingInputs.length != 0) {
    existingInputs.forEach(function (input) {
      input.style.opacity = '0';
      input.addEventListener('transitionend', removeInput);
    });

    function removeInput(event) {
      event.target.remove();
    }

    if (direction == 'left') {
      newForeignInput.style.transform = 'translateX(100%)';
      newTranslationInput.style.transform = 'translateX(100%)';
    } else {
      newForeignInput.style.transform = 'translateX(-100%)';
      newTranslationInput.style.transform = 'translateX(-100%)';
    }

    foreignDiv.appendChild(newForeignInput);
    translationDiv.appendChild(newTranslationInput);

    newForeignInput.offsetHeight;
    newTranslationInput.offsetHeight;

    newForeignInput.style.transition = 'transform 0.5s ease, opacity 0.5s ease';
    newTranslationInput.style.transition = 'transform 0.5s ease, opacity 0.5s ease';

    newForeignInput.style.transform = 'translateX(0)';
    newTranslationInput.style.transform = 'translateX(0)';
  } else if (first) {
    newForeignInput.style.transition = 'transform 0.5s ease, opacity 0.5s ease';
    newTranslationInput.style.transition = 'transform 0.5s ease, opacity 0.5s ease';

    foreignDiv.appendChild(newForeignInput);
    translationDiv.appendChild(newTranslationInput);

    newForeignInput.style.transform = 'translateX(0)';
    newTranslationInput.style.transform = 'translateX(0)';
  }
}


document.addEventListener('touchstart', function (event) {
  var startX = event.touches[0].clientX;
  document.addEventListener('touchend', handleTouchEnd);

  function handleTouchEnd(event) {
    var endX = event.changedTouches[0].clientX;
    var diffX = endX - startX;
    if (diffX < 0) {
      swipeLeft();
    } else swipeRight();
    document.removeEventListener('touchend', handleTouchEnd);
  }
});

document.addEventListener('mousedown', function (event) {
  var startX = event.clientX;
  document.addEventListener('mouseup', handleMouseUp);

  function handleMouseUp(event) {
    var endX = event.clientX;
    var diffX = endX - startX;
    if (diffX < 0) {
      swipeLeft();
    } else swipeRight();
    document.removeEventListener('mouseup', handleMouseUp);
  }
});
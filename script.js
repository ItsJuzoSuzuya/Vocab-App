function navigateToNewSite(url) {
  var currentLanguage;
  var urlParams = new URLSearchParams(window.location.search);
      currentLanguage = urlParams.get('lang');
      currentTopic = urlParams.get('topic');

  if (window.event.target.classList.contains('languageButton')) {
    currentLanguage = window.event.target.innerText;
    window.location.href = url + '?lang=' + encodeURIComponent(currentLanguage);
  }else if(window.event.target.classList.contains('topicButton')){
    currentTopic = window.event.target.innerText;
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
    var urlParams = new URLSearchParams(window.location.search);
    var currentLanguage = urlParams.get('lang');

    var inputText = input.value.trim();
  
    var storedText = localStorage.getItem(currentLanguage + 'Topics');
    var storedValues = storedText ? JSON.parse(storedText) : [];
  
    storedValues.push(inputText);
  
    localStorage.setItem(currentLanguage + 'Topics', JSON.stringify(storedValues));
  }

  function saveWord(input1, input2){
    var urlParams = new URLSearchParams(window.location.search);
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
  var urlParams = new URLSearchParams(window.location.search);
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
        navigateToNewSite('wordSite.html');
      };
      addButton.parentNode.insertBefore(newButton, addButton);
    });
  }
}

  function loadWords(){
    var urlParams = new URLSearchParams(window.location.search);
    var currentLanguage = urlParams.get('lang');
    var currentTopic = urlParams.get('topic');

    var topics = localStorage.getItem(currentLanguage + currentTopic + 'Words');

    //console.log(topics);
  
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
  
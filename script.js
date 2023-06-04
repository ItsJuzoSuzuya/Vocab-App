function navigateToNewSite(url) {
  var currentLanguage;
  var urlParams = new URLSearchParams(window.location.search);
      currentLanguage = urlParams.get('lang');

  if (window.event.target.classList.contains('languageButton')) {
    currentLanguage = window.event.target.innerText;
    window.location.href = url + '?lang=' + encodeURIComponent(currentLanguage);
  } else if(currentLanguage != null){
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

  function saveInputText(input){
    var urlParams = new URLSearchParams(window.location.search);
    var currentLanguage = urlParams.get('lang');

    var inputText = input.value.trim();
  
    var storedText = localStorage.getItem(currentLanguage + 'Topics');
    var storedValues = storedText ? JSON.parse(storedText) : [];
  
    storedValues.push(inputText);
  
    localStorage.setItem(currentLanguage + 'Topics', JSON.stringify(storedValues));
  }

function loadTopics(){
  var urlParams = new URLSearchParams(window.location.search);
  var currentLanguage = urlParams.get('lang');
  var topics = localStorage.getItem(currentLanguage + 'Topics');

  console.log(currentLanguage);
  console.log(topics);

  if (topics) {
    var addButton = document.querySelector('.addButton');
    var savedValues = JSON.parse(topics);

    savedValues.forEach(function(buttonText) {
      var newButton = document.createElement('button');
      newButton.className = 'button topicButton';
      newButton.innerText = buttonText;
      newButton.onclick = function() {
        navigateToNewSite('topicSite.html');
      };
      addButton.parentNode.insertBefore(newButton, addButton);
    });
  }
}
  
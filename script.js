function navigateToNewSite(url) {
    window.location.href = url;
}

function saveText(button){
    var buttonText = button.innerText.trim();

    var storedText = localStorage.getItem('languages');
    var storedValues = storedLanguages ? JSON.parse(storedText) : [];

    storedValues.push(buttonText);

    localStorage.setItem('languages', JSON.stringify(storedValues));
} 

function saveText(input){
  var inputText = input.value.trim();

  var storedText = localStorage.getItem('topics');
  var storedValues = storedText ? JSON.parse(storedText) : [];

  storedValues.push(inputText);

  localStorage.setItem('topics', JSON.stringify(storedValues));
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

function loadTopics(){
  console.log("ther are topics");
  var topics = localStorage.getItem('topics');

  if (topics) {
    console.log("ther are topics");
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
  
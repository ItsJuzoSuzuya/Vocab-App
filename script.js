function navigateToNewSite(url) {
    window.location.href = url;
}

function saveText(button){
    var buttonText = button.innerText.trim();

    var storedLanguages = localStorage.getItem('languages');
    var storedValues = storedLanguages ? JSON.parse(storedLanguages) : [];

    storedValues.push(buttonText);

    localStorage.setItem('languages', JSON.stringify(storedValues));
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
          navigateToNewSite('languageSite.html');
        };
        addButton.parentNode.insertBefore(newButton, addButton);
      });
    }
  }
  
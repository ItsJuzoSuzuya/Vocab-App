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
      if (diffX < -10) {
        swipeLeft();
      } else if(diffX > 10)  swipeRight();
      document.removeEventListener('touchend', handleTouchEnd);
    }
  });
  
  document.addEventListener('mousedown', function (event) {
    var startX = event.clientX;
    document.addEventListener('mouseup', handleMouseUp);
  
    function handleMouseUp(event) {
      var endX = event.clientX;
      var diffX = endX - startX;
      if (diffX < -10) {
        swipeLeft();
      } else if(diffX > 10) swipeRight();
      document.removeEventListener('mouseup', handleMouseUp);
    }
  });
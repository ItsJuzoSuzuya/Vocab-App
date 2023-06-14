function swipeLeft() {
  currentIndex++;
  if (currentIndex >= words.length) {
    currentIndex = 0;
  }

  var mainDiv = document.querySelector('main');
  mainDiv.style.transform = `translateY(-${currentIndex * 60}px)`;
  loadNextBigCard();
}

function loadNextBigCard() {
  Object.entries(savedValues)[currentIndex];

  var foreignInput = document.querySelector('.bigWord:first-child');
  var translationInput = document.querySelector('.bigWord:last-child');

  foreignInput.value = words[currentIndex].foreign;
  translationInput.value = words[currentIndex].translation;
}

document.addEventListener('DOMContentLoaded', function () {
  document.addEventListener('swipeleft', swipeLeft);
});

document.addEventListener('touchstart', function (event) {
  var startX = event.touches[0].clientX;
  document.addEventListener('touchend', handleTouchEnd);

  function handleTouchEnd(event) {
    var endX = event.changedTouches[0].clientX;
    var diffX = endX - startX;
    if (diffX < 0) {
      swipeLeft();
    }
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
    }
    document.removeEventListener('mouseup', handleMouseUp);
  }
});
var savedWords = JSON.parse(words);
var keys = Object.keys(savedWords);
var shuffeldWords = shuffle(keys);
var wordMap = new Map();
var finished;

shuffeldWords.forEach(key => {
  wordMap.set(key, savedWords[key]);
});

var nativeClicked = false;
var foreignClicked = false;

var keys;
var values;

var currentKeys = [];
var currentValues = [];
var pairs = [];
var curWords= [];

var pairCounter = 0;

function loadWords() {
  currentKeys = [];
  currentValues = [];

  if (typeof keys === 'undefined' || typeof values === 'undefined') {
    [keys, values] = separateKeyValuePairs(wordMap);
  }
  finished = false;

  var nativeColumn = document.querySelector('.pair .nativeColumn');
  var foreignColumn = document.querySelector('.pair .foreignColumn');

  

  for (let i = 0; i < 5 && i < wordMap.size; i++) {
    currentKeys.push(keys[0]);
    currentValues.push(values[0]);

    var nativeWord = document.createElement('button');
    nativeWord.innerText = keys[0].text;
    nativeWord.onclick = function() {
      checkForPair(this, currentKeys[i]);
    };
    var nativeCell = document.createElement('td');
    nativeCell.appendChild(nativeWord);
        
    var foreignWord = document.createElement('button');
    foreignWord.innerText = values[0].text;
    foreignWord.onclick = function() {
      checkForPair(this, currentValues[i]);
    };
    var foreignCell = document.createElement('td');
    foreignCell.appendChild(foreignWord);

    nativeColumn.appendChild(nativeCell);
    foreignColumn.appendChild(foreignCell);

    pairCounter++;

    keys.shift();
    values.shift();
  }
}

function checkForPair(button, word){
  
  curWords.push(word);
  
  console.log(word.clicked);

  if(!word.clicked){
    if(word.native && !nativeClicked){
      pairs.push(button);
      nativeClicked = true;
      button.style.backgroundColor = 'green'
      word.clicked = true;
    }
    else if(!word.native && !foreignClicked){
      pairs.push(button);
      foreignClicked = true;
      button.style.backgroundColor = 'green'
      word.clicked = true;
    }
  }
  console.log(pairs.length);
  if(pairs.length == 2){
    if(!wordMap.get(pairs[0].innerText))
      [pairs[0], pairs[1]] = [pairs[1], pairs[0]];
    if(wordMap.get(pairs[0].innerText).includes(pairs[1].innerText)){ 
      wordMap.delete(pairs[0].innerText);
      pairs.forEach(pair => {
        pair.classList.add('invisible');
        pair.clicked = false;
      });

      pairs = []; 

      pairCounter--;

      if(pairCounter == 0){ 
         loadWords();
      } 
      
      nativeClicked = false;
      foreignClicked = false;
    }
    else{
      pairs.forEach((pair) => {
        pair.style.backgroundColor = 'red';
      });
  
      curWords.forEach((curWord) =>{
        curWord.clicked = false;
      });

      setTimeout(() => {
        pairs.forEach((pair) => {
          pair.style.backgroundColor = '';
        });
        pairs = [];   
        nativeClicked = false;
        foreignClicked = false;
      }, 1000);
    } 
  }
}
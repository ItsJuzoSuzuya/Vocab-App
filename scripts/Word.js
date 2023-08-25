class Word{
    clicked = false
  
    constructor(text, isNative){
      this.text = text;
      this.native = isNative;
    }  
  }
  
function separateKeyValuePairs(map) {
    var keys = [];
    var values = [];
  
    map.forEach(function(key, val) {
        keys.push(new Word(key, true));
        values.push(new Word(val, false));
      }
    )
    
    return [(keys), (values)];
  }

function shuffle(array) {
    var m = array.length, t, i;
    
    while (m) {
    
      i = Math.floor(Math.random() * m--);
    
      t = array[m];
      array[m] = array[i];
      array[i] = t;
    }
    
    return array;
  }
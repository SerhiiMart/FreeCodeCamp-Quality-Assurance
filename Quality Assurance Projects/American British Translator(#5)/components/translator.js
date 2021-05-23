const americanOnly = require('./american-only.js');
const americanToBritishSpelling = require('./american-to-british-spelling.js');
const americanToBritishTitles = require("./american-to-british-titles.js")
const britishOnly = require('./british-only.js')

class Translator {
  returnMe(word,translate){
   
   if(translate == 'american-to-british'){
    let timer = /[0-9]{1,2}(\:?\.?){1}[0-9]{1,2}/gi;
  
    if(word.match(timer)){
    let timeIndex = word.match(timer);
    let timeFixer = timeIndex.toString().replace(/\:/,".");
    word = word.replace(timeIndex,`<span class="highlight">`+timeFixer+'</span>')
   }
   }else{
     if(translate =='british-to-american'){
      let timer = /[0-9]{1,2}(\:?\.?){1}[0-9]{1,2}/gi;
      if(word.match(timer)){
      let timeIndex = word.match(timer);
      let timeFixer = timeIndex.toString().replace(/\./,":");
      word = word.replace(timeIndex,`<span class="highlight">`+timeFixer+'</span>')
      }
     }
   }
  

   if(translate =='american-to-british'){
   for(const [key, value] of Object.entries(americanOnly)){
     
      let regexr = new RegExp('\\b'+`${key}`+'\\b','gi');
      if(word.match(regexr)){
      word = word.replace(regexr, '<span class="highlight">'+`${value}`+`</span>`);
       }   
    }
   }

    
    for(const [key, value] of Object.entries(americanToBritishTitles)){
      if(translate =='american-to-british'){
        let regex = new RegExp(`${key}`,'gi');
        let capMe = americanToBritishTitles[key].charAt(0).toUpperCase().concat(americanToBritishTitles[key].slice(1))
        word = word.replace(regex,`<span class="highlight">`+capMe+`</span>`);
      }else {
        if(translate == 'british-to-american'){
        let regex = new RegExp('\\b'+`${value}`+'\\b','gi');
        let capMe = key.charAt(0).toUpperCase().concat(key.slice(1))
        word = word.replace(regex,`<span class="highlight">`+capMe+`</span>`)
      }
     }
    }

   for(const [key, value] of Object.entries(americanToBritishSpelling)){
      if(translate =='american-to-british'){
        let regexr = new RegExp('\\b' +`${key}` + '\\b','gi');
        word = word.replace(regexr,`<span class="highlight">`+`${value}`+`</span>`)
      }else {
        if(translate == 'british-to-american'){
        let regexr = new RegExp('\\b' + `${value}` + '\\b','gi');
        word = word.replace(regexr,`<span class="highlight">`+`${key}`+`</span>`);
      }
     }
    }

  if(translate == 'british-to-american'){
    
   for(const [key, value] of Object.entries(britishOnly)){
      let regexr = new RegExp('(?<![\\w-])'+`${key}`+'(?![\\w-])','gi');
      word = word.replace(regexr,`<span class="highlight">`+`${value}`+`</span>`)
     
    }
  }
  
    if(!word.includes(`</span>`)){
      return 'Everything looks good to me!';
    }
    return word;
  }
}

module.exports = Translator;
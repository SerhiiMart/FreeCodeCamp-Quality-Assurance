const americanOnly = require('./american-only.js');
const americanToBritishSpelling = require('./american-to-british-spelling.js');
const americanToBritishTitles = require("./american-to-british-titles.js")
const britishOnly = require('./british-only.js')

class Translator {
  constructor() {
    let ameticanTitles = {};
    let americanSpelling =  {};
    for (let e in americanToBritishTitles) {
      ameticanTitles[americanToBritishTitles[e]] = e;
    }
    for (let e in americanToBritishSpelling) {
      americanSpelling[americanToBritishSpelling[e]] = e;
    }
    
    this.toAmaricTitles = ameticanTitles;
    this.toAmericSpelling = americanSpelling;
  }
  
  getTranslation(usage, order) {
    let translation = "";
    if (order === "american-to-british") {
      translation = americanOnly[usage] || americanToBritishSpelling[usage] || americanToBritishTitles[usage] || usage; 
      if (/^\d{1,2}[:]\d{2}[ap]m$/.test(usage) || /^\d{1,2}[:]\d{2}$/.test(usage)) {
        translation = usage.replace(":", ".");
        }
    } else {
      translation = britishOnly[usage] || this.toAmericSpelling[usage] || this.toAmaricTitles[usage] || usage;
      if (/^\d{1,2}[.]\d{2}[ap]m$/.test(usage) || /^\d{1,2}[.]\d{2}$/.test(usage)) {
        translation = usage.replace(".", ":");
        }
    }
		if (translation === this.toAmaricTitles[usage] || translation === americanToBritishTitles[usage]) {
      	translation = '<span class="highlight">' + translation[0].toUpperCase() + translation.substring(1) + '</span>';
    } else if (translation !== usage) {
      	translation = '<span class="highlight">' + translation + '</span>';
      }
    
    return translation;
  }
  translate(text, from_to) {
    let text_str = text.trim();
    let ending = /\w[!?.]$/.test(text_str) ? text_str.slice(-1) : "";
    if (ending) { text_str = text_str.substring(0, text_str.length - 1) }
    let translation = "";

    while (text_str) {
      if ((/^\s/).test(text_str)) {
      
      	translation += /\s$/.test(translation) ? "" : " ";
        text_str = text_str.replace(/^\s+/, "");
        
      } else if ((/^\W+/m).test(text_str)) {
      	translation += text_str.match(/^\W+/)[0];
        text_str = text_str.replace(/^\W+/, "");
        
      } else {
      
      	let expression = text_str.match(/\S+\s*\S*\s*\S*/)[0].split(/\s+/).join(" ");
        let check_Exp = expression.toLowerCase();
        let translated = "";
      
        while (check_Exp) {
          translated = this.getTranslation(check_Exp, from_to);
          if (translated === check_Exp) {
            let sliced = check_Exp.replace(/\s\w+$|[^A-Za-z0-9_.]+\w*$|[.]+\w*$/, "")
            check_Exp = check_Exp !== sliced ? sliced : "";
            expression = expression.replace(/\s\w+$|[^A-Za-z0-9_.]+\w*$|[.]+\w*$/, "");
          } else {
            break;
          }
      	}
        if (expression.toLowerCase() === translated) {
          translated = expression;
        }
				translation += /^\S/.test(translation) ? translated : translated[0].toUpperCase() + translated.substring(1);
        text_str = text_str.replace(expression, "");
      }

      }
    translation = translation + ending;
    return translation;
  }

}

module.exports = Translator;
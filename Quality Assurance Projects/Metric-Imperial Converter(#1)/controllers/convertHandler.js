////Global regex variable
let globalRegex =/[a-z]+|[^a-z]+/gi;

function ConvertHandler() {
  
  this.getNum = function(input) {
    let result= input.match(globalRegex)[0]
    
    if(/\d/.test(result)=== false){
      result =1
    } 
    
    if(result.toString().includes("/")){
      let val =result.toString().split("/")
      if(val.length != 2){
        return "invalid number"
      }
      result = val[0] / val[1]
    }
    
    if(isNaN(result)){
      return "invalid number"
    }
    
    return parseFloat(result)
  };
  
  this.getUnit = function(input) {
    let result= input.toLowerCase().match(globalRegex)[1]
    let validUnits = ["gal","l","L","lbs","kg","mi","km"]
    
    if(!result){
      result = input.toLowerCase().match(globalRegex)[0]
    }
    
    if(result === "l"){
      result = result.toUpperCase()
    }
    
    if(!validUnits.includes(result)){
      return "invalid unit"
    }
    
    return result;
  };
  
  this.getReturnUnit = function(initUnit) {
    let result;
    
    switch(initUnit){
      case "gal":
        result = "L"
        break
      case "L":
        result = "gal"
        break
      case "lbs":
        result = "kg"
        break
      case "kg":
        result = "lbs"
        break
      case "mi":
        result = "km"
        break
      case "km":
        result = "mi"
        break
    }
    
    return result;
  };

  this.spellOutUnit = function(unit) {
    let result;
    
    switch(unit){
      case "gal":
        result = "gallons"
        break
      case "L":
        result = "liters"
        break
      case "lbs":
        result = "pounds"
        break
      case "kg":
        result = "kilograms"
        break
      case "mi":
        result = "miles"
        break
      case "km":
        result = "kilometers"
        break
    }
    
    return result;
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result;
    
    if(initUnit === "gal"){
      result = (initNum * galToL).toFixed(5)
    }else if (initUnit === "L"){
      result = (initNum /galToL).toFixed(5)
    }
    
    if(initUnit === "lbs"){
      result = (initNum * lbsToKg).toFixed(5)
    }else if (initUnit === "kg"){
      result = (initNum /lbsToKg).toFixed(5)
    }
    
    if(initUnit === "mi"){
      result = (initNum * miToKm).toFixed(5)
    }else if (initUnit === "km"){
      result = (initNum /miToKm).toFixed(5)
    }
    
    return parseFloat(result);
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    let result=initNum + " " + this.spellOutUnit(initUnit) + " converts to " +returnNum +" " + this.spellOutUnit(returnUnit)
    
    return result;
  };
}

module.exports = ConvertHandler;
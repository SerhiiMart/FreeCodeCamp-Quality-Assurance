function ConvertHandler() {
  this.getNum = function(input) {
    let numRegex = /[\W\d]+/g;
    let num = input.match(numRegex);
    let result;
    if (!num) {
      let unit = this.getUnit(input);
      if (unit === "error") {
        return; // unit but incorrect spelling
      }
      if (unit === "invalid") {
        return "invalid"; // no unit
      } else {
        result = "1";
      }
    }

    if (num) {
      result = num[0];
      if (result == "0" || result.includes("-") || result === "Infinity") {
        return "invalid";
      }
      if (result.includes("/")) {
        let values = result.split("/");
        if (values.length != 2) {
          return "invalid";
        }
        values[0] = parseFloat(values[0]);
        values[1] = parseFloat(values[1]);
        result = parseFloat(values[0] / values[1]).toFixed(5);
      }
      if (isNaN(result)) {
        return "invalid";
      }
    }
    return result * 1;
  };

  this.getUnit = function(input) {
    let unitRegex = /[a-z]+$/i;
    let unit = input.match(unitRegex);
    if (!unit) {
      return "invalid";
    }
    if (unit) {
      let result = unit[0].toLowerCase();
      let validUnits = ["gal", "l", "mi", "km", "lbs", "kg"];
      if (!validUnits.includes(result)) {
        return "error";
      }
      if (result === "l") {
        result = "L";
      }
      return result;
    }
  };

  this.getReturnUnit = function(initUnit) {
    if (!initUnit) return;
    let unit = initUnit.toLowerCase();
    switch (unit) {
      case "gal":
        return "L";
        break
      case "l":
        return "gal";
        break
      case "lbs":
        return "kg";
        break
      case "kg":
        return "lbs";
        break
      case "mi":
        return "km";
        break
      case "km":
        return "mi";
        break
      default:
        return 'invalid unit'
        break
    }
  };

  this.spellOutUnit = function(initUnit) {
    let unit = initUnit.toLowerCase();
    switch (unit) {
      case "gal":
        return "gallons";
        break
      case "l":
        return "liters";
        break
      case "lbs":
        return "pounds";
        break
      case "kg":
        return "kilograms";
        break
      case "mi":
        return "miles";
        break
      case "km":
        return "kilometers";
        break
      default:
        return 'units';
        break
    }
  };

  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;

    let result;
    switch (initUnit) {
      case "gal":
        result = initNum * galToL;
        break;
      case "L":
        result = initNum / galToL;
        break;
      case "lbs":
        result = initNum * lbsToKg;
        break;
      case "kg":
        result = initNum / lbsToKg;
        break;
      case "mi":
        result = initNum * miToKm;
        break;
      case "km":
        result = initNum / miToKm;
        break;
      default:
        result =  'invalid number'
        break
    }

    if (result != "error") {
      result = parseFloat(result).toFixed(5) * 1;
    }
    return result;
  };

  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    let result;
    result = initNum + " " + this.spellOutUnit(initUnit) + " converts to " + returnNum + " " + this.spellOutUnit(returnUnit);
    return result;
  };
}

module.exports = ConvertHandler;

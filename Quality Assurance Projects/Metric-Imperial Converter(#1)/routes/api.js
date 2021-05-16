'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  
  let convertHandler = new ConvertHandler();

  app.route('/api/convert')
    .get(function (req, res){
      let input = req.query.input;
      let initNum = convertHandler.getNum(input);
      let initUnit = convertHandler.getUnit(input);
      let returnNum = convertHandler.convert(initNum, initUnit);
      let returnUnit = convertHandler.getReturnUnit(initUnit);
      let toString = convertHandler.getString(initNum, initUnit, returnNum, returnUnit);
      
      //res.json
    if(initUnit === "invalid unit" && initNum === "invalid number"){
      res.json("invalid number and unit")
    }
    if(initUnit === "invalid unit"){
      res.json("invalid unit")
    }
    if(initNum === "invalid number"){
      res.json("invalid number")
    }
    
    let resObj = {
    "initNum": initNum,
    "initUnit": initUnit,
    "returnNum": returnNum,
    "returnUnit": returnUnit,
    "string": toString
    }
   
    res.json(resObj)
  });
    
};

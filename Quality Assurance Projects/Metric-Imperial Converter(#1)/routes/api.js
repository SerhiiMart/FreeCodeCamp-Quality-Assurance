'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  
  let convertHandler = new ConvertHandler();
  
      app.route('/api/convert')
        .get(function (req, res) {
            const input = req.query.input;
            const initNum = convertHandler.getNum(input);
            const initUnit = convertHandler.getUnit(input);

            const hasInvalidNum = initNum === convertHandler.INVALID_NUMBER;
            const hasInvalidUnit = initUnit === convertHandler.INVALID_UNIT;

            let result;

            if (hasInvalidNum && hasInvalidUnit) {
                result = { string: 'invalid number and unit' };
            } else if (hasInvalidNum) {
                result = { string: initNum };
            } else if (hasInvalidUnit) {
                result = { string: initUnit };
            } else {
                const returnNum = convertHandler.convert(initNum, initUnit);
                const returnUnit = convertHandler.getReturnUnit(initUnit);
                const string = convertHandler.getString(initNum, initUnit, returnNum, returnUnit);

                result = { initNum, initUnit, returnNum, returnUnit, string };
            }
            res.json(result);
        });

};

'use strict';

const Translator = require('../components/translator.js');
const translator = new Translator();


module.exports = function (app) {

  app.route('/api/translate')
    .post((req, res) => {
      const locator = ["american-to-british", "british-to-american"];

      if (req.body.text === "") {
        return res.json({ error: "No text to translate" });
      }
      if (!req.body.text || !req.body.locale) {
        return res.json({ error: "Required field(s) missing" });
      }
      if (!locator.includes(req.body.locale)) {
        return res.json({ error: "Invalid value for locale field" });
      }
  
      let result = translator.translate(req.body.text, req.body.locale);
      return res.json({ text: req.body.text, translation: result });
    });
};

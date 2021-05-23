const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
const server = require('../server.js');

chai.use(chaiHttp);

let Translator = require('../components/translator.js');

suite('Functional Tests', () => {
  suite("/api/translate => post request", () => {
    test('Translation with text and locale fields',  function(done){
      const strText = 'Mangoes are my favorite fruit.';
      const strLocale = 'american-to-british';
      const strTranslated = 'Mangoes are my <span class="highlight">favourite</span> fruit.';
      chai.request(server)
        .post('/api/translate')
        .send({
          text: strText,
          locale: strLocale
        })
        .end(function(err, res){
          assert.equal(res.status, 200);
          assert.equal(res.type, 'application/json', "Response should be json");
          assert.property(res.body, 'text', 'Response should contain propertie text');
          assert.equal(res.body.text, strText, 'Response text should be equal: "'+strText+'"');
          assert.property(res.body, 'translation', 'Response should contain propertie translation');
          assert.equal(res.body.translation, strTranslated, 'Response translation should be equal: "'+strTranslated+'"');
          done();
        });
    });

    test("Translation with text and invalid locale field", done => {
      chai.request(server)
        .post("/api/translate")
        .send({
          text: "Paracetamol takes up to an hour to work.",
          locale: "invalid locale"
        })
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.equal(res.body.error, "Invalid value for locale field");
          done();
        });
    });

    test("Translation with missing text field", done => {
      chai.request(server)
        .post("/api/translate")
        .send({ locale: "american-to-british" })
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.equal(res.body.error, "Required field(s) missing");
          done();
        });
    });

    test("Translation with missing locale field", done => {
      chai.request(server)
        .post("/api/translate")
        .send({ text: "Mangoes are my favorite fruit." })
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.equal(res.body.error, "Required field(s) missing");
          done();
        });
    });

    test("Translation with empty text", done => {
      chai.request(server)
        .post("/api/translate")
        .send({ text: "", locale: "american-to-british" })
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.equal(res.body.error, "No text to translate");
          done();
        });
    });

    test("Translation with text that needs no translation: POST request to /api/translate", function(done) {
      const text = 'Everything looks good to me!';
      const output = {
        text: 'Everything looks good to me!',
        translation: 'Everything looks good to me!',
    };
    chai.request(server)
      .post('/api/translate')
      .send({ text: text, locale:  "british-to-american" })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.equal(res.type, 'application/json');
        assert.deepEqual(res.body, output);
        done();
      });
    });
  });
});

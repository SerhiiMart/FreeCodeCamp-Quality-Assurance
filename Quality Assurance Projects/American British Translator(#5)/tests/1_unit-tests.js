const { assert } = require("chai");
const { JSDOM } = require("jsdom");

const Translator = require("../components/translator");
let translator = new Translator();

suite("Unit Tests", () => {
  suite("to british English", () => {
    let local = "american-to-british";
    test("Mangoes are my favorite fruit.", done => {
      var input = "Mangoes are my favorite fruit.";
      assert.equal(
        translator.translate(input, local),
        'Mangoes are my <span class="highlight">favourite</span> fruit.'
      );
      done();
    });

    test("I ate yogurt for breakfast.", done => {
      var input = "I ate yogurt for breakfast.";
      assert.equal(
        translator.translate(input, local),
        'I ate <span class="highlight">yoghurt</span> for <span class="highlight">brekkie</span>.'
      );
      done();
    });

    test("We had a party at my friend's condo.", done => {
      var input = "We had a party at my friend's condo.";
      assert.equal(
        translator.translate(input, local),
        'We had a party at my friend\'s <span class="highlight">flat</span>.'
      );
      done();
    });

    test("Can you toss this in the trashcan for me?", done => {
      var input = "Can you toss this in the trashcan for me?";
      assert.equal(
        translator.translate(input, local),
        'Can you toss this in the <span class="highlight">bin</span> for me?'
      );
      done();
    });

    test("The parking lot was full.", done => {
      var input = "The parking lot was full.";
      assert.equal(
        translator.translate(input, local),
        'The <span class="highlight">car park</span> was full.'
      );
      done();
    });

    test("Like a high tech Rube Goldberg machine.", done => {
      var input = "Like a high tech Rube Goldberg machine.";
      assert.equal(
        translator.translate(input, local),
        'Like a high tech <span class="highlight">Heath Robinson device</span>.'
      );
      done();
    });

    test("To play hooky means to skip class or work.", done => {
      var input = "To play hooky means to skip class or work.";
      assert.equal(
        translator.translate(input, local),
        'To <span class="highlight">bunk off</span> means to skip class or work.'
      );
      done();
    });

    test("No Mr. Bond, I expect you to die.", done => {
      var input = "No Mr. Bond, I expect you to die.";
      assert.equal(
        translator.translate(input, local),
        'No <span class="highlight">Mr</span> Bond, I expect you to die.'
      );
      done();
    });

    test("Dr. Grosh will see you now.", done => {
      var input = "Dr. Grosh will see you now.";
      assert.equal(
        translator.translate(input, local),
        '<span class="highlight">Dr</span> Grosh will see you now.'
      );
      done();
    });

    test("Lunch is at 12:15 today.", done => {
      var input = "Lunch is at 12:15 today.";
      assert.equal(
        translator.translate(input, local),
        'Lunch is at <span class="highlight">12.15</span> today.'
      );
      done();
    });
  });

  suite("British to American", () => {
    let local = "british-to-american";
    test("We watched the footie match for a while.", done => {
      var input = "We watched the footie match for a while.";
      assert.equal(
        translator.translate(input, local),
        'We watched the <span class="highlight">soccer</span> match for a while.'
      );
      done();
    });

    test("Paracetamol takes up to an hour to work.", done => {
      var input = "Paracetamol takes up to an hour to work.";
      assert.equal(
        translator.translate(input, local),
        '<span class="highlight">acetaminophen</span> takes up to an hour to work.'
      );
      done();
    });

    test("First, caramelise the onions.", done => {
      var input = "First, caramelise the onions.";
      assert.equal(
        translator.translate(input, local),
        'First, <span class="highlight">caramelize</span> the onions.'
      );
      done();
    });

    test("I spent the bank holiday at the funfair.", done => {
      var input = "I spent the bank holiday at the funfair.";
      assert.equal(
        translator.translate(input, local),
        'I spent the <span class="highlight">public holiday</span> at the <span class="highlight">carnival</span>.'
      );
      done();
    });

    test("I had a bicky then went to the chippy.", done => {
      var input = "I had a bicky then went to the chippy.";
      assert.equal(
        translator.translate(input, local),
        'I had a <span class="highlight">cookie</span> then went to the <span class="highlight">fish-and-chip shop</span>.'
      );
      done();
    });

    test("I've just got bits and bobs in my bum bag.", done => {
      var input = "I've just got bits and bobs in my bum bag.";
      assert.equal(
        translator.translate(input, local),
        'I\'ve just got <span class="highlight">odds and ends</span> in my <span class="highlight">fanny pack</span>.'
      );
      done();
    });

    test("The car boot sale at Boxted Airfield was called off.", done => {
      var input = "The car boot sale at Boxted Airfield was called off.";
      assert.equal(
        translator.translate(input, local),
        'The <span class="highlight">swap meet</span> at Boxted Airfield was called off.'
      );
      done();
    });

    test("Have you met Mrs Kalyani?", done => {
      var input = "Have you met Mrs Kalyani?";
      assert.equal(
        translator.translate(input, local),
        'Have you met <span class="highlight">Mrs.</span> Kalyani?'
      );
      done();
    });

    test("Prof Joyner of King's College, London.", done => {
      var input = "Prof Joyner of King's College, London.";
      assert.equal(
        translator.translate(input, local),
        '<span class="highlight">Prof.</span> Joyner of King\'s College, London.'
      );
      done();
    });

    test("Tea time is usually around 4 or 4.30.", done => {
      var input = "Tea time is usually around 4 or 4.30.";
      assert.equal(
        translator.translate(input, local),
        'Tea time is usually around 4 or <span class="highlight">4:30</span>.'
      );
      done();
    });
  });

  suite("Highlight translation american", () => {
    let local = "british-to-american";
    test("Mangoes are my favorite fruit.", done => {
      var input = "Mangoes are my favorite fruit.";
      assert.equal(
        translator.translate(input, local),
        "Everything looks good to me!"
      );
      done();
    });

    test("I ate yogurt for breakfast.", done => {
      var input = "I ate yogurt for breakfast.";
      assert.equal(
        translator.translate(input, local),
        "Everything looks good to me!"
      );
      done();
    });
  });

  suite("Highlight translation british", () => {
    let local = "american-to-british";
    test("We watched the footie match for a while.", done => {
      var input = "We watched the footie match for a while.";
      assert.equal(
        translator.translate(input, local),
        "Everything looks good to me!"
      );
      done();
    });

    test("Paracetamol takes up to an hour to work.", done => {
      var input = "Paracetamol takes up to an hour to work.";
      assert.equal(
        translator.translate(input, local),
        "Everything looks good to me!"
      );
      done();
    });
  });
});
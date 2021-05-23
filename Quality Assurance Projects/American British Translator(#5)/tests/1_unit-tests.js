const chai = require('chai');
const assert = chai.assert;

const Translator = require('../components/translator.js');
let translate;

suite('Unit Tests', () => {
   suiteSetup(done => {
    translate = new Translator();
    done();
});

    suite("Test for valid function", () => {
      test("Mangoes are my favorite fruit.",(done)=>{
          let language = "american-to-british";
          let str = "Mangoes are my favorite fruit.";
          let change = 'Mangoes are my <span class="highlight">favourite</span> fruit.';
          assert.strictEqual(translate.returnMe(str,language),change)
          done();
      })
      
      test("I ate yogurt for breakfast.",(done)=>{
          let language = 'american-to-british';
          let str = 'I ate yogurt for breakfast.';
          let change = 'I ate <span class="highlight">yoghurt</span> for breakfast.';
          assert.strictEqual(translate.returnMe(str,language),change)
          done();
      })

        test("We had a party at my friend's condo.",(done)=>{
          let language = "american-to-british";
          let str = "We had a party at my friend's condo.";
          let change = '<span class="highlight">flat</span>.';
          assert.include(translate.returnMe(str,language),change)
          done();
      })

      test("Can you toss this in the trashcan for me?",(done)=>{
          let language = 'american-to-british';
          let str = 'Can you toss this in the trashcan for me?';
          let change = 'Can you toss this in the <span class="highlight">bin</span> for me?';
          assert.strictEqual(translate.returnMe(str,language),change)
          done();
      })

        test("The parking lot was full.",(done)=>{
          let language = 'american-to-british';
          let str = 'The parking lot was full.';
          let change = 'The <span class="highlight">car park</span> was full.';
          assert.strictEqual(translate.returnMe(str,language),change)
          done();
      })

      test("Like a high tech Rube Goldberg machine.",(done)=>{
          let language = 'american-to-british';
          let str = "Like a high tech Rube Goldberg machine.";
          let change = 'Like a high tech <span class="highlight">Heath Robinson device</span>.';
          assert.strictEqual(translate.returnMe(str,language),change)
          done();
      })

      test("To play hooky means to skip class or work.",(done)=>{
          let language = "american-to-british";
          let str = "To play hooky means to skip class or work.";
          let change = 'To <span class="highlight">bunk off</span> means to skip class or work.';
          assert.strictEqual(translate.returnMe(str,language),change)
          done();
      })

      test("No Mr. Bond, I expect you to die.",(done)=>{
          let language = "american-to-british";
          let str = "No Mr. Bond, I expect you to die.";
          let change = 'No <span class="highlight">Mr</span> Bond, I expect you to die.';
          assert.strictEqual(translate.returnMe(str,language),change)
          done();
      })

      test("Dr. Grosh will see you now.",(done)=>{
          let language = "american-to-british";
          let str = "Dr. Grosh will see you now.";
          let change = '<span class="highlight">Dr</span> Grosh will see you now.';
          assert.strictEqual(translate.returnMe(str,language),change)
          done();
      })

      test("Lunch is at 12:15 today.",(done)=>{
          let language = "american-to-british";
          let str = "Lunch is at 12:15 today.";
          let change = 'Lunch is at <span class="highlight">12.15</span> today.';
          assert.strictEqual(translate.returnMe(str,language),change)
          done();
      })

        test("We watched the footie match for a while.",(done)=>{
          let language = "british-to-american";
          let str = "We watched the footie match for a while.";
          let change = 'We watched the <span class="highlight">soccer</span> match for a while.';
          assert.strictEqual(translate.returnMe(str,language),change)
          done();
      })

        test("Paracetamol takes up to an hour to work.",(done)=>{
          let language = "british-to-american";
          let str = "Paracetamol takes up to an hour to work.";
          let change = '<span class="highlight">Tylenol</span> takes up to an hour to work.';
          assert.strictEqual(translate.returnMe(str,language),change)
          done();
      })

      test("First, caramelise the onions.",(done)=>{
          let language = "british-to-american";
          let str = "First, caramelise the onions.";
          let change = 'First, <span class="highlight">caramelize</span> the onions.';
          assert.strictEqual(translate.returnMe(str,language),change)
          done();
      })

      test("I spent the bank holiday at the funfair.",(done)=>{
          let language = "british-to-american";
          let str = "I spent the bank holiday at the funfair.";
          let change = 'I spent the <span class="highlight">public holiday</span> at the <span class="highlight">carnival</span>.';
          assert.strictEqual(translate.returnMe(str,language),change)
          done();
      })

      test("I had a bicky then went to the chippy.",(done)=>{
          let language = "british-to-american";
          let str = "I had a bicky then went to the chippy.";
          let change = 'I had a <span class="highlight">cookie</span> then went to the <span class="highlight">fish-and-chip shop</span>.';
          assert.strictEqual(translate.returnMe(str,language),change)
          done();
      })

      test("I've just got bits and bobs in my bum bag.",(done)=>{
          let language = "british-to-american";
          let str = "I've just got bits and bobs in my bum bag.";
          let change = 'I\'ve just got <span class="highlight">odds and ends</span> in my <span class="highlight">fanny pack</span>.';
          assert.strictEqual(translate.returnMe(str,language),change);
          done();
      })

        test("The car boot sale at Boxted Airfield was called off.",(done)=>{
          let language = "british-to-american";
          let str = "The car boot sale at Boxted Airfield was called off.";
          let change = 'The <span class="highlight">swap meet</span> at Boxted Airfield was called off.';
          assert.strictEqual(translate.returnMe(str,language),change)
          done();
      })
      
      test("Have you met Mrs Kalyani?",(done)=>{
          let language = "british-to-american";
          let str = "Have you met Mrs Kalyani?";
          let change = 'Have you met <span class="highlight">Mrs.</span> Kalyani?';
          assert.strictEqual(translate.returnMe(str,language),change)
          done();
      })
      
      test("Prof Joyner of King's College, London.",(done)=>{
          let language = 'british-to-american';
          let str = "Prof Joyner of King's College, London.";
          let change = '<span class="highlight">Prof.</span> Joyner of King\'s College, London.';
          assert.strictEqual(translate.returnMe(str,language),change)
          done();
      })

      test('Tea time is usually around 4 or 4.30.',(done)=>{
          let language = "british-to-american";
          let str = 'Tea time is usually around 4 or 4.30.';
          let change = 'Tea time is usually around 4 or <span class="highlight">4:30</span>.';
          assert.strictEqual(translate.returnMe(str,language),change)
          done();
      })
    }); 

    suite("Test for highlighted text", () => {
          test("Mangoes are my favorite fruit.",(done)=>{
          let language = "american-to-british";
          let str = "Mangoes are my favorite fruit.";
          let change = '<span class="highlight">favourite</span>';
          assert.include(translate.returnMe(str,language),change)
          done();
      })

      test("I ate yogurt for breakfast.",(done)=>{
          let language = "american-to-british";
          let str = "I ate yogurt for breakfast.";
          let change = '<span class="highlight">yoghurt</span>';
          assert.include(translate.returnMe(str,language),change)
          done();
      })
      
      test("We watched the footie match for a while.",(done)=>{
          let language = "british-to-american";
          let str = "We watched the footie match for a while.";
          let change = 'soccer</span>';
          assert.include(translate.returnMe(str,language),change)
          done();
      })
      
        test("Paracetamol takes up to an hour to work.",(done)=>{
          let language = "british-to-american";
          let str = "Paracetamol takes up to an hour to work.";
          let change = 'Tylenol</span>';
          assert.include(translate.returnMe(str,language),change)
          done();
      });
    });
});
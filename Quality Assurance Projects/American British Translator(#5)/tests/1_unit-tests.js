const { assert } = require("chai");
const { JSDOM } = require("jsdom");

const Translator = require("../components/translator");
let translator = new Translator();

suite("Unit Tests", () => {
  test('Translate [Mangoes are my favorite fruit.] to British English', () => {
    assert.include(translator.translate('Mangoes are my favorite fruit.', 'american-to-british'), 'favourite', 'favorite -> favourite');
  });
  
  test('Translate [I ate yogurt for breakfast.] to British English', () => {
    assert.include(translator.translate('I ate yogurt for breakfast.', 'american-to-british'), 'yoghurt', 'yogurt -> yoghurt');
    assert.strictEqual(translator.translate('I ate yogurt for breakfast.', 'american-to-british'), 'I ate <span class="highlight">yoghurt</span> for breakfast.')
  });
  
  test("Translate [We had a party at my friend's condo.] to British English", () => {
    assert.include(translator.translate("We had a party at my friend's condo.", 'american-to-british'), 'flat', 'condo -> flat');
    assert.strictEqual(translator.translate("We had a party at my friend's condo.", 'american-to-british'), 'We had a party at my friend\'s <span class="highlight">flat</span>.')
  });
  
  test('Translate [Can you toss this in the trashcan for me?] to British English', () => {
    assert.include(translator.translate("Can you toss this in the trashcan for me?", 'american-to-british'), 'bin', 'trashcan -> bin');
    assert.strictEqual(translator.translate("Can you toss this in the trashcan for me?", 'american-to-british'), 'Can you toss this in the <span class="highlight">bin</span> for me?')
  });
  
  test('Translate [The parking lot was full.] to British English', () => {
    assert.include(translator.translate("The parking lot was full.", 'american-to-british'), 'car park', 'parking lot -> car park');
    assert.strictEqual(translator.translate("The parking lot was full.", 'american-to-british'), 'The <span class="highlight">car park</span> was full.')
  });
  
  test('Translate [Like a high tech Rube Goldberg machine.] to British English', () => {
    assert.include(translator.translate("Like a high tech Rube Goldberg machine.", 'american-to-british'), 'Heath Robinson device', 'Rube Goldberg machine -> Heath Robinson device');
    assert.strictEqual(translator.translate("Like a high tech Rube Goldberg machine.", 'american-to-british'), 'Like a high tech <span class="highlight">Heath Robinson device</span>.')
  });
  
  test('Translate [To play hooky means to skip class or work.] to British English', () => {
    assert.include(translator.translate("To play hooky means to skip class or work.", 'american-to-british'), 'bunk off', 'play hooky -> bunk off');
    assert.strictEqual(translator.translate("To play hooky means to skip class or work.", 'american-to-british'), 'To <span class="highlight">bunk off</span> means to skip class or work.')
  });
  
  test('Translate [No Mr. Bond, I expect you to die.] to British English', () => {
    assert.include(translator.translate("No Mr. Bond, I expect you to die.", 'american-to-british'), 'Mr', 'Mr. -> Mr');
    assert.notInclude(translator.translate("No Mr. Bond, I expect you to die.", 'american-to-british'), 'Mr.', '"Mr." is translated as "Mr"')
  });
  
  test('Translate [Dr. Grosh will see you now.] to British English', () => {
    assert.include(translator.translate("Dr. Grosh will see you now.", 'american-to-british'), 'Dr', 'Dr. -> Dr');
    assert.notInclude(translator.translate("Dr. Grosh will see you now.", 'american-to-british'), 'Dr.', '"Dr." is translated as "Dr"')
  });
  
  test('Translate [Lunch is at 12:15 today.] to British English', () => {
    assert.include(translator.translate("Lunch is at 12:15 today.", 'american-to-british'), '12.15', '12:15 -> 12.15');
    assert.strictEqual(translator.translate("Lunch is at 12:15 today.", 'american-to-british'), 'Lunch is at <span class="highlight">12.15</span> today.')
  });
  
  test('Translate [We watched the footie match for a while.] to American English', () => {
    assert.include(translator.translate("We watched the footie match for a while.", 'british-to-american'), 'soccer', 'footie -> soccer');
    assert.strictEqual(translator.translate("We watched the footie match for a while.", 'british-to-american'), 'We watched the <span class="highlight">soccer</span> match for a while.')
  });
  
  test('Translate [Paracetamol takes up to an hour to work.] to American English', () => {
    assert.include(translator.translate("Paracetamol takes up to an hour to work.", 'british-to-american'), 'Tylenol', 'Paracetamol -> Tylenol');
    assert.strictEqual(translator.translate("Paracetamol takes up to an hour to work.", 'british-to-american'), '<span class="highlight">Tylenol</span> takes up to an hour to work.')
  });
  
  test('Translate [First, caramelise the onions.] to American English', () => {
    assert.include(translator.translate("First, caramelise the onions.", 'british-to-american'), 'caramelize', 'caramelise -> caramelize');
    assert.strictEqual(translator.translate("First, caramelise the onions.", 'british-to-american'), 'First, <span class="highlight">caramelize</span> the onions.')
  });
  
  test('Translate [I spent the bank holiday at the funfair.] to American English', () => {
    assert.include(translator.translate("I spent the bank holiday at the funfair.", 'british-to-american'), 'public holiday', 'bank holiday -> public holiday');
    assert.include(translator.translate("I spent the bank holiday at the funfair.", 'british-to-american'), 'carnival', 'funfair -> carnival');
    assert.notInclude(translator.translate("I spent the bank holiday at the funfair."), 'bank holiday', '"bank holiday" is translated');
    assert.notInclude(translator.translate("I spent the bank holiday at the funfair."), 'funfair', '"funfair" is translated');    
  });
  
  test('Translate [I had a bicky then went to the chippy.] to American English', () => {
    assert.include(translator.translate("I had a bicky then went to the chippy.", 'british-to-american'), 'cookie', 'bicky -> cookie');
    assert.include(translator.translate("I had a bicky then went to the chippy.", 'british-to-american'), 'fish-and-chip shop', 'chippy -> fish-and-chip shop');
    assert.notInclude(translator.translate("I had a bicky then went to the chippy."), 'bicky', '"bicky" is translated');
    assert.notInclude(translator.translate("I had a bicky then went to the chippy."), 'chippy', '"chippy" is translated');    
  });
  
  test("Translate [I've just got bits and bobs in my bum bag.] to American English", () => {
    assert.include(translator.translate("I've just got bits and bobs in my bum bag.", 'british-to-american'), 'odds and ends', 'bits and bobs -> odds and ends');
    assert.include(translator.translate("I've just got bits and bobs in my bum bag.", 'british-to-american'), 'fanny pack', 'bum bag -> fanny pack');
    assert.notInclude(translator.translate("I've just got bits and bobs in my bum bag."), 'bits and bobs', '"bits and bobs" is translated');
    assert.notInclude(translator.translate("I've just got bits and bobs in my bum bag."), 'bum bag', '"bum bag" is translated');    
  });
  
  test("Translate [The car boot sale at Boxted Airfield was called off.] to American English", () => {
    assert.include(translator.translate("The car boot sale at Boxted Airfield was called off.", 'british-to-american'), 'swap meet', 'car boot sale -> swap meet');
    assert.notInclude(translator.translate("The car boot sale at Boxted Airfield was called off."), 'car boot sale', '"car boot sale" is translated'); 
  });
  
  test("Translate [Have you met Mrs Kalyani?] to American English", () => {
    assert.include(translator.translate("Have you met Mrs Kalyani?", 'british-to-american'), 'Mrs.', 'Mrs -> Mrs.');
    assert.notInclude(translator.translate("Have you met Mrs Kalyani?"), 'Mrs ', '"Mrs" is translated'); 
  });
  
  test("Translate [Prof Joyner of King's College, London.] to American English", () => {
    assert.include(translator.translate("Prof Joyner of King's College, London.", 'british-to-american'), 'Prof.', 'Prof -> Prof.');
    assert.notInclude(translator.translate("Prof Joyner of King's College, London."), 'Prof ', '"Prof" is translated'); 
  });
  
  test("Translate [Tea time is usually around 4 or 4.30.] to American English", () => {
    assert.include(translator.translate("Tea time is usually around 4 or 4.30.", 'british-to-american'), '4:30', '4.30-> 4:30');
    assert.notInclude(translator.translate("Tea time is usually around 4 or 4.30."), '4.30 ', '"4.30" is changed into "4:30"'); 
  });
  
  test("Highlight translation in [Mangoes are my favorite fruit.]", () => {
    assert.include(translator.translate("Mangoes are my favorite fruit.", 'american-to-british'), '<span class="highlight">favourite</span>', '"favourite" is highlighted');
  });
  
  test("Highlight translation in [I ate yogurt for breakfast.]", () => {
    assert.include(translator.translate("I ate yogurt for breakfast.", 'american-to-british'), '<span class="highlight">yoghurt</span>', '"yoghurt" is highlighted');
  });
  
  test("Highlight translation in [We watched the footie match for a while.]", () => {
    assert.include(translator.translate("We watched the footie match for a while.", 'british-to-american'), '<span class="highlight">soccer</span>', '"soccer" is highlighted');
  });
  
  test("Highlight translation in [Paracetamol takes up to an hour to work.]", () => {
    assert.include(translator.translate("Paracetamol takes up to an hour to work.", 'british-to-american'), '<span class="highlight">Tylenol</span>', '"Tylenol" is highlighted');
  });
});
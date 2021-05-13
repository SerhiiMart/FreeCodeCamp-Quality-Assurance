const bcrypt = require('bcrypt');
const ObjectID = require('mongodb').ObjectID; ///added for Serialization of a User Object
const passport = require('passport');
const LocalStrategy = require('passport-local');


module.exports = function (app, myDataBase) {
  ////Implement the Serialization of a Passport User
    // Serialization and deserialization here...
////Serialization of a User Object
  passport.serializeUser((user, done) => {
    done(null, user._id);
  });
  passport.deserializeUser((id, done) => {
    myDataBase.findOne({ _id: new ObjectID(id) }, (err, doc) => {
      done(null, doc);
    });
  });
  ////Authentication Strategies
passport.use(new LocalStrategy(
  function(username, password, done) {
    myDataBase.findOne({ username: username }, function (err, user) {
      console.log('User '+ username +' attempted to log in.');
      if (err) { return done(err); }
      if (!user) { return done(null, false); }
      if (password !== user.password) { return done(null, false); }
      if (!bcrypt.compareSync(password, user.password)) { 
        return done(null, false);
      }
      return done(null, user);
    });
  }
));
};

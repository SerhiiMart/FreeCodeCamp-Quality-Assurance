'use strict';
require('dotenv').config();

const express = require('express');
const myDB = require('./connection');
const fccTesting = require('./freeCodeCamp/fcctesting.js');

const routes = require('./routes');
const auth = require('./auth.js');

const session = require('express-session');
const passport = require('passport');
const PORT = process.env.PORT || 3000;
const app = express();
//console.log(process.env.MONGO_URI);

////Io Server
const http = require('http').createServer(app);
const io = require('socket.io')(http);

fccTesting(app); //For FCC testing purposes
app.use('/public', express.static(process.cwd() + '/public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'pug');


////Seting up Passport

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: true,
  cookie: { secure: false }
}));
app.use(passport.initialize());
app.use(passport.session());

////Connection to the database
myDB(async (client) => {
  const myDataBase = await client.db('database').collection('users');

  routes(app, myDataBase);
  auth(app, myDataBase);
  
 ////Io connection
  let currentUsers = 0;
  io.on('connection', (socket) => {
    ++currentUsers;
    io.emit('user count', currentUsers);
    console.log('A user has connected');
  });
  // Be sure to add this...
}).catch((e) => {
  app.route('/').get((req, res) => {
    res.render('pug', { title: e, message: 'Unable to login' });
  });
});


// app.listen out here...
///Listener
 http.listen(PORT, () => {
  console.log('Listening on port ' + PORT);
});

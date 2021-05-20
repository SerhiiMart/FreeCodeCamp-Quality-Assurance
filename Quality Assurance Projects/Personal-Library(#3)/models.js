const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const librarySchema = new Schema({
  title: {type: String, required: true },
  comments: {type: String}
});

const Books = mongoose.model('Books', librarySchema);

exports.Books = Books;

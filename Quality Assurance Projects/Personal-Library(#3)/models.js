const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const librarySchema = new Schema({
  title: {type: String, required: true },
  comments: {type: Array, default: []},
  commentcount: {type: Number, default: 0}
});

const Book = mongoose.model('Book', librarySchema);

exports.Book = Book;

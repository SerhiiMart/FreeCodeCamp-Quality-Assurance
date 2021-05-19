const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const librarySchema = new Schema({
  title: {type: String, required: true },
  comments: {type: String, required: true },
});

const libraryModel = mongoose.model('libraryModel', librarySchema);

exports.libraryModel = libraryModel;

const mongoose = require("mongoose");

// Creating a book schema
const BookSchema = mongoose.Schema({
  ISBN: String,
  title: String,
  pubDate: String,
  language: String,
  numPage: Number,
  author: [Nubmber],
  publications: Number,
  category: [String],
});

//Create a book model
const BookModel = mongoose.model("books",BookSchema);

module.exports = BookModel;

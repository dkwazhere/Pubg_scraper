// Dependencies
const mongoose = require('mongoose');
// create schema class
const Schema = mongoose.Schema;
// Create comment schema
const CommentSchema = new Schema({
  author: {
    type: String
  },
  content: {
    type: String
  }
});

// Create the Comment model
var Comment = mongoose.model('Comment', CommentSchema);

// Export Model
module.exports = Comment;

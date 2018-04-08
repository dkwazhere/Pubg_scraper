// Dependencies
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Article Schema
const ArticleSchema = new Schema({
  title: {
    type: String,
    require: true
  },
  link: {
    type: String,
    require: true
  },
  comments: [{
    type: Schema.Types.ObjectId,
    ref: 'Comment'
  }]
});

// Create article model with Mongoose
const Article = mongoose.model('Article',  ArticleSchema);

// Export model
module.exports = Article;

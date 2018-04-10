// Dependencies
const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const logger = require('morgan');
const request = require('request');
const cheerio = require('cheerio');

// Initiliaze express for debugging/body Parser
var app = express();
app.use(logger('dev'));
app.use(bodyParser.urlencoded({
  extended: false
}))

// Static content
app.use(express.static(process.cwd() + '/public'));

// Handlebars
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// Data base mongoose
if(process.env.NODE_ENV == 'production') {
  mongoose.connect('mongodb://localhost/pubg-scraper');
} else {
  mongoose.connect('mongodb://localhost/pubg-scraper');
}
var db = mongoose.connection;

// show mongoose errors
db.on('error', function(err) {
  console.log('Mongoose Error: ' + err);
});

// show mongoose success
db.on('open', function() {
  console.log('Mongoose connection success!');
});

// importing models
var Comment = require('./models/Comment.js');
var Article = require('./models/Article.js');

var router = require('./controllers/controller.js');
app.use('/', router);

var port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log("Running on PORT: " + port);
});

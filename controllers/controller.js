// Dependencies
const express = require('express');
const router = express.Router();
const path = require('path');
const request = require('request');
const cheerio = require('cheerio');

// Import models
const db = require("../models");
const Comment = require('../models/Comment.js');
const Article = require('../models/Article.js');

// Render Index Page
router.get('/', function(req, res) {
  res.redirect('/scrape');
});

// Article Page rendering
router.get('/articles', function(req, res) {
  Article.find().sort({_id: 1})
  .populate('comments')
  .exec(function(err, doc) {
    if(err) {
      console.log(err);
    } else {
      var hbsObject = {articles: doc}
      res.render('index', hbsObject);
    }
  });
});


// Scrape
router.get("/scrape", function(req, res) {
  // Make a request for the news section of ycombinator
  request("https://www.reddit.com/r/PUBATTLEGROUNDS/", function(error, response, html) {
    // Load the html body from request into cheerio
    var $ = cheerio.load(html);
    // For each element with a "title" class
    $("p.title").each(function(_, element) {
      // Save the text and href of each link enclosed in the current element
      var $a = $(element).children('p');
      var title = $a.text();
      var link = $a.attr("href");

      // If this found element had both a title and a link
      if (title && link) {
        // Insert the data in the scrapedData db
        db.Article.create({
          link: link,
          title: title
        }).then(function(dbArticle) {
          res.send("scraped");
        }).catch(function(err) {
          res.json(err);
        })
      };
    });
  });
  // Send a "Scrape Complete" message to the browser
  res.redirect("/articles")
});










// export router to server.js
module.exports = router;

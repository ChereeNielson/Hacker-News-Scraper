// https://www.w3schools.com/js/js_strict.asp
// "use strict" helps you write cleaner code, preventing you from using undeclared variables //
"use strict";

// NODE DEPENDENCIES
// ============================================================= //
const express = require("express"),
  router = express.Router(),
  Article = require("../models/article");

// ROOT ROUTE
router.get("/", function(req, res) {
  Article.find({})
    .where("saved")
    .equals(false)
    .where("deleted")
    .equals(false)
    .sort("-date")
    .limit(20)
    .exec(function(error, articles) {
      if (error) {
        console.log(error);
        res.status(500);
      } else {
        console.log(articles);
        let hbsObject = {
          title: "All the News That's Fit to Scrape",
          subtitle: "Hacker News Edition",
          articles: articles
        };
        res.render("index", hbsObject);
      }
    });
});

// SAVED ARTICLES
router.get("/saved", function(req, res) {
  Article.find({})
    .where("saved")
    .equals(true)
    .where("deleted")
    .equals(false)
    .populate("notes")
    .sort("-date")
    .exec(function(error, articles) {
      if (error) {
        console.log(error);
        res.status(500);
      } else {
        console.log(articles);
        let hbsObject = {
          title: "All the News That's Fit to Scrape",
          subtitle: "Saved Hacker News Articles",
          articles: articles
        };
        res.render("saved", hbsObject);
      }
    });
});

// REQUIRE CONTROLLERS
router.use("/api", require("./api"));

module.exports = router;

// https://www.w3schools.com/js/js_strict.asp
// "use strict" helps you write cleaner code, preventing you from using undeclared variables //
"use strict";

// NODE DEPENDENCIES
// ============================================================= //
const db = require("../models/");

module.exports = function(app) {
  // ROOT ROUTE
  // ============================================================= //
  app.get("/", function(req, res) {
    db.Article.find({})
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
          let hbsObj = {
            title: "All the News That's Fit to Scrape",
            subtitle: "Hacker News Edition",
            articles: articles
          };
          res.render("index", hbsObj);
        }
      });
  });

  // SAVED ARTICLES
  // ============================================================= //
  app.get("/saved", function(req, res) {
    db.Article.find({})
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
          let hbsObj = {
            title: "All the News That's Fit to Scrape",
            subtitle: "Saved Hacker News",
            articles: articles
          };
          res.render("saved", hbsObj);
        }
      });
  });
};

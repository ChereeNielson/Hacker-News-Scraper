// OUR SCRAPING TOOLS
// ============================================================= //
// Axios is a promised-based http library, similar to jQuery's Ajax method
// It works on the client and on the server
let axios = require("axios");
let cheerio = require("cheerio");
let db = require("../models");

module.exports = function(app) {
  app.get("/", function(req, res) {
    res.render("index");
  });

  app.get("/scrape", function(req, res) {
    axios.get("https://news.ycombinator.com/").then(function(response) {
      let scrapeData = {
        data: []
      };

      let $ = cheerio.load(response.data);
      $("tr .athing").each(function() {
        let result = {};
        result.title = $(this)
          .children("td .title")
          .children("a")
          .text();
        result.link = $(this)
          .children("td .title")
          .children("a")
          .attr("href");
        scrapeData.data.push(result);
      });
      res.render("scrape", scrapeData);
    });
  });

  app.get("/saved", function(req, res) {
    db.Article.find({}).then(function(dbArticle) {
      let hbsObject = {
        data: dbArticle
      };
      res.render("saved", hbsObject);
    });
  });
};

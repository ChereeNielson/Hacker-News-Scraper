// https://www.w3schools.com/js/js_strict.asp
// "use strict" helps you write cleaner code, preventing you from using undeclared variables //
"use strict";

// NODE DEPENDENCIES
// ============================================================= //
const db = require("../models/");

module.exports = function(app) {
  // ROOT ROUTE
  // ============================================================= //
  app.get("/api/articles", function(req, res) {
    db.Article.find({}).then(function(dbArticle) {
      hbsObject = {
        data: dbArticle
      };
      res.json(hbsObject);
    });
  });

  app.get("/api/articles/:id", function(req, res) {
    db.Article.findById(req.params.id)
      .then(function(dbArticle) {
        hbsObject = {
          data: [dbArticle]
        };
        res.json("saved", hbsObject);
      })
      .catch(function(err) {
        console.log(err);
      });
  });

  app.put("/api/articles/", function(req, res) {
    db.Article.findOneAndUpdate(
      { _id: req.body.id },
      {
        $set: {
          title: req.body.title,
          link: req.body.link
        }
      }
    )
      .then(function(dbArticle) {
        res.render("saved", dbArticle);
      })
      .catch(function(err) {
        console.log(err);
      });
  });

  app.post("/api/articles", function(req, res) {
    db.Article.create(req.body)
      .then(function(dbArticle) {
        hbsObject = {
          data: [dbArticle]
        };
        res.send(dbArticle);
      })
      .catch(function(err) {
        console.log(err);
      });
  });

  app.delete("/api/articles/:id", function(req, res) {
    let id = req.params.id;

    db.Note.deleteArticle({ article: id })
      .then(function() {
        db.Article.findByIdAndDelete(id)
          .then(function(dbArticle) {
            hbsObject = {
              data: [dbArticle]
            };
            res.render("index", dbArticle);
          })
          .catch(function(err) {
            console.log(err);
          });
      })
      .catch(function(err) {
        console.log(err);
      });
  });

  app.post("/api/note/:id", function(req, res) {
    let newNote = {
      text: req.body.text,
      article: req.params.id
    };
    db.Note.create(newNote)
      .then(function(dbArticle) {
        hbsObject = {
          data: [dbArticle]
        };
        res.send(dbArticle);
      })
      .catch(function(err) {
        console.log(err);
      });
  });

  app.get("/api/note/:id", function(req, res) {
    db.Note.find({ article: req.params.id })
      .then(function(dbNote) {
        hbsObject = {
          layout: false,
          noteData: dbNote,
          articleId: req.params.id
        };
        console.log(hbsObject);
        res.render("partials/note", hbsObject);
      })
      .catch(function(err) {
        console.log(err);
      });
  });

  app.delete("/api/note/:id", function(req, res) {
    let id = req.params.id;

    db.Note.findByIdAndDelete(id)
      .then(function(dbNote) {
        res.json(dbNote);
      })
      .catch(function(err) {
        console.log(err);
      });
  });
};

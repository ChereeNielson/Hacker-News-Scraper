// https://www.w3schools.com/js/js_strict.asp
// "use strict" helps you write cleaner code, preventing you from using undeclared variables //
"use strict";

// NODE DEPENDENCIES
// ============================================================= //
const express = require("express"),
  router = express.Router(),
  request = require("request"),
  cheerio = require("cheerio"),
  Article = require("../models/article"),
  Note = require("../../models/note");

// Get all notes
router.get("/", function(req, res) {
  Note.find({}).exec(function(err, notes) {
    if (err) {
      console.log(err);
      res.status(500);
    } else {
      res.status(200).json(notes);
    }
  });
});

// Add a note to a saved article
router.post("/:id", function(req, res) {
  let newNote = new Note(req.body);
  newNote.save(function(err, doc) {
    if (err) {
      console.log(err);
      res.status(500);
    } else {
      Article.findOneAndUpdate(
        { _id: req.params.id },
        { $push: { notes: doc.id } },
        function(error, newDoc) {
          if (error) {
            console.log(error);
            res.status(500);
          } else {
            res.redirect("/saved");
          }
        }
      );
    }
  });
});

// Delete a note from a saved article
router.delete("/:id", function(req, res) {
  Note.findByIdAndRemove(req.params.id, function(err, note) {
    if (err) {
      console.log(err);
      res.status(500);
    } else {
      res.redirect("/saved");
    }
  });
});

module.exports = router;

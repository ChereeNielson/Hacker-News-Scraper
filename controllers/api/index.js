// https://www.w3schools.com/js/js_strict.asp
// "use strict" helps you write cleaner code, preventing you from using undeclared variables //
"use strict";

// NODE DEPENDENCIES
// ============================================================= //
const express = require("express"),
const router = express.Router(),
const request = require("request"),
const cheerio = require("cheerio"),
const Article = require("../../models/article"),
const Note = require("../../models/note");

router.get("/", function(req, res) {
    res.status(200).send("<a href=\'/api/articles/\'>articles</a><br><a href=\'/api/notes/\'>notes</a>");
});

router.use("/articles", require("./articles"));
router.use("/notes", require("./notes"));

module.exports = router;
// https://www.w3schools.com/js/js_strict.asp
// "use strict" helps you write cleaner code, preventing you from using undeclared variables //
"use strict";

// NODE DEPENDENCIES
// ============================================================= //
const express = require("express"),
      exphbs = require("express-handlebars"),
      logger = require("morgan"),
      mongoose = require("mongoose"),
    //   methodOverride = require("method-override");


// OUR SCRAPING TOOLS
// ============================================================= //
// Axios is a promised-based http library, similar to jQuery's Ajax method
// It works on the client and on the server
// let axios = require("axios");
// let cheerio = require("cheerio");


// SET UP THE PORT
// ============================================================= //
const PORT = process.env.PORT || 3000;


// SET UP AND INITIALIZE EXPRESS APP
// ============================================================= //
let app = express();

app
    .use(express.json())
    .use(express.urlencoded({ extended:true }))
    .use(express.text())
    .use(express.json({ type: "application/vnd.api+json" }))
    // .use(methodOverride("_method"))
    .use(logger("dev"))
    .use(express.static(__dirname + "/public"))
    .engine("handlebars", exphbs({ defaultLayout: "main" }))
    .set("view engine", "handlebars")
    .use(require("./controllers"));


// CONFIGURE MONGOOSE AND START THE SERVER
// ============================================================= //
// Set Mongoose to leverage promises
mongoose.Promise = Promise;

// If deployed, use the deployed database. Otherwise use the local newsArticles database
const dbURI = process.env.MONGODB_URI || "mongodb://localhost:27017/newsArticles";

// Database configuration with Mongoose
mongoose.set("useCreateIndex", true)

// Connect to the Mongo DB
mongoose.connect(dbURI, { useNewUrlParser: true });

const db = mongoose.connection;

// Show any Mongoose errors
db.on("error", function(error) {
    console.log("Mongoose Error: ", error);
});

// Once logged in to the DB through Mongoose, log a success message
db.once("open", function() {
    console.log("Mongoose connection successful");
    // Start the Server
    app.listen(PORT, () => console.log("App running on port " + PORT + "!"));
});

module.exports = app;
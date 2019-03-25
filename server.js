// https://www.w3schools.com/js/js_strict.asp
// "use strict" helps you write cleaner code, preventing you from using undeclared variables //
"use strict";

// NODE DEPENDENCIES
// ============================================================= //
const express = require("express");
const exphbs = require("express-handlebars");
const logger = require("morgan");
const mongoose = require("mongoose");

// SET UP THE PORT
// ============================================================= //
const PORT = process.env.PORT || 3000;

// SET UP AND INITIALIZE EXPRESS APP
// ============================================================= //
let app = express();

// CONFIGURE MONGOOSE AND START THE SERVER
// ============================================================= //
const dbURI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/newsArticles";

// Connect to the Mongo DB
mongoose.connect(dbURI, { useNewUrlParser: true });

const db = mongoose.connection;

// Show any "mongoose' errors
db.on("error", function(error) {
  console.log("Mongoose Error: ", error);
});
// Once logged in to the DB through Mongoose, log a success message
db.once("open", function() {
  console.log("Mongoose connection successful");
});

// Use "morgan" logger for logging requests
app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Make "public" a static folder
app.use(express.static("public"));

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// ROUTES
// ============================================================= //
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

// START THE SERVER
// ============================================================= //
app.listen(PORT, () => console.log("App running on port " + PORT + "!"));

module.exports = app;

const mongoose = require("mongoose");

// Create Schema for DB and save a reference to the Schema constructor
const Schema = mongoose.Schema;

// Using the Schema constructor, create a new Article Schema
const ArticleSchema = new Schema({

    // `title` of article
    title: {
      type: String,
      required: true
    },
    // `link` to article
    link: {
      type: String,
      unique: true,
      required: true
    },
    // `save` article or not
    save: {
      type: Boolean,
      required: true,
      default: false
    },
    // `delete` article or not
    delete: {
      type: Boolean,
      required: true,
      default: false
    },
    // `date` is set when added to database
    date: {
      type: Date,
      default: Date.now
    },
    // `note` is an array that stores a Note id
    note: [{
      type: Schema.Types.ObjectId,
      // the ref property links the ObjectId to the `Note` model
      ref: "Note",
      require: false
    }]

  });
  
// This creates our model from the above schema, using Mongoose's model method
  let Article = mongoose.model("Article", ArticleSchema);
  
  // Export the Article model
  module.exports = Article;
  
const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

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
  saved: {
    type: Boolean,
    default: false
  },
  // `delete` article or not
  deleted: {
    type: Boolean,
    default: false
  },
  // `date` is set when added to database
  date: {
    type: Date,
    default: Date.now
  },
  notes: [
    {
      type: Schema.Types.ObjectId,
      ref: "Note",
      required: false
    }
  ]
});

// Plugin to make articles unique
ArticleSchema.plugin(uniqueValidator);

// This creates our model from the above schema, using Mongoose's model method
const Article = mongoose.model("Article", ArticleSchema);

// Export the Article model
module.exports = Article;

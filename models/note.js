const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

// Save a reference to the Schema constructor
const Schema = mongoose.Schema;

// Using the Schema constructor, create a new NoteSchema object
// This is similar to a Sequelize model
const NoteSchema = new Schema({
  text: {
    type: String,
    required: true
  },
  article: {
    type: Schema.Types.ObjectId,
    ref: "Article"
  }
});

// Add unique-validator plugin
NoteSchema.plugin(uniqueValidator);

// This creates our model from the above NoteSchema, using Mongoose's model method
const Note = mongoose.model("Note", NoteSchema);

// Export the Note model
module.exports = Note;

const mongoose = require('mongoose');
const { Schema } = mongoose;

const notesSchema = new Schema({
    //adding a unique id to notes so that user can access only their notes
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        default: "General",
        unique: true,
    },
    tag: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    }
  });

  module.exports = mongoose.model('notes', notesSchema);
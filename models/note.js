const mongoose = require('mongoose');

const noteShema = new mongoose.Schema({
    title:String,
    content:String
});

const Note = mongoose.model('Note',noteShema);

module.exports = Note;


const mongoose = require('mongoose');

const noteShema = new mongoose.Schema({
    
    title:{
    type: String,
    required: true
    },
    content:{
    type: String,
    required: true
    }
},
    {timestamps: true}

);

const Note = mongoose.model('Note',noteShema);

module.exports = Note;


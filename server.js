const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
app.use(express.json());

const PORT = Number(process.env.PORT) || 4000


const Note = require('./models/note.js'); //Note model

console.log('port is:', PORT);

mongoose.connect(process.env.MONGO_URI).then( () =>{

console.log('Connection To Mongo Succeded');

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
}
).catch( (err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1); })


app.post('/home/notes', async (req,res) => {
    const title = req.body.title;
    const content = req.body.note;
    const newNote = new Note({title , content}); 
    try {
    const savedNote = await newNote.save();
    res.status(200).json(savedNote);


    } catch (err) {
        res.status(500).json({error : err.name})    
    };
    
})


app.get('/home/notes' , async (req,res) => {

    try {
    const allNotes = await Note.find();
    res.status(200).json(allNotes);
    } catch (err) {
        res.json(err);
    }
})



app.delete('/home/notes/:id', async (req,res) => {
    const id = req.params.id;
    try {
    await Note.findByIdAndDelete(id)
    res.status(200).json({message : 'deletion succeded'});

    } catch (err) {
        res.json(err);

    }
})



app.put('/home/notes/:id', async (req,res) => {
    const id = req.params.id;
    const newTitle = req.body.title; //new title
    const newNote = req.body.note; //new content

    try {
    const note = await Note.findById(id);
    if (note==null) {return res.status(404).json({error : 'note not found'})}

    note.title = newTitle;
    note.content = newNote;
    await note.save();

    return res.status(200).json({message : 'Modification succeded'});

    } catch (err) {
        res.status(500).json(err);

    }
})



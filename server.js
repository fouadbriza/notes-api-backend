const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const app = express();
app.use(express.json());
const PORT = Number(process.env.PORT) || 4000

const Note = require('./models/note.js'); //Note model


const signeupRoute = require('./routes/signup');
app.use('/api' , signeupRoute);

const notesRoute = require('./routes/notes')
app.use('/' , notesRoute);

const loginRoute = require('./routes/login.js');
app.use('/api' , loginRoute);


mongoose.connect(process.env.MONGO_URI).then( () =>{

console.log('Connection To Mongo Succeded');

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
}
).catch( (err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1); })





require('dotenv').config() //whats used for
const { default: mongoose } = require('mongoose');
const Note = require('./models/note');
const PORT = 4000;


mongoose.connect(process.env.MONGO_URI).then( async () => {
    console.log('Connection to database succeded');
    const allNotes = await Note.find({ createdAt: { $exists: false } });

    for (const item of allNotes) {
     item.createdAt = new Date() // rough estimate 
     item.updatedAt = new Date();  
     console.log(item._id.getTimestamp());
     await item.save();
     console.log('well done');
     
    }
}
).catch ((err) => {console.log('error hapened')})
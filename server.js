const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const app = express();
app.use(express.json());
const cors = require('cors');

const allowedOrigins = [
  process.env.FRONTEND_URL,
  process.env.PREVIEW_URL
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));


const PORT = Number(process.env.PORT) || 4000;

const Note = require("./models/note.js"); //Note model

//signup route
const signeupRoute = require("./routes/signup");
app.use("/", signeupRoute);

//login route
const loginRoute = require("./routes/login.js");
app.use("/", loginRoute);

//middleware
const verifyTokenMiddlware = require("./middleware/verifyToken.js");

//notes route
const notesRoute = require("./routes/notes");
app.use("/home/notes", verifyTokenMiddlware, notesRoute);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connection To Mongo Succeded");

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });

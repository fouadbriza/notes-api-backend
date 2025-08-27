const router = require("express").Router();
const Note = require("../models/note");

router.post("/", async (req, res) => {
  const title = req.body.title;
  const content = req.body.content;
  const userId = req.user.userId;

  
  try {
    const newNote = new Note({ title, content , userId });
    const savedNote = await newNote.save();
    res.status(200).json(savedNote);
  } catch (err) {
    res.status(500).json({ error: err.name });
  }
});

router.get("/", async (req, res) => {
  try {
    const userId = req.user.userId;
    const allNotes = await Note.find({userId}).sort({ createdAt: -1 });

    res.status(200).json(allNotes);
  } catch (err) {
    res.json(err);
  }
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  const userId = req.user.userId;
  try {
    await Note.findOneAndDelete({_id: id, userId: userId});
    res.status(200).json({ message: "deletion succeded" });
  } catch (err) {
    res.json(err);
  }
});

router.put("/:id", async (req, res) => {
  const id = req.params.id;
  const newTitle = req.body.title; //new title
  const newNote = req.body.content; //new content
  const userId = req.user.userId;
  try {
    const note = await Note.findOne({_id: id, userId: userId});
    if (note == null) {
      return res.status(404).json({ error: "note not found" });
    }

    note.title = newTitle;
    note.content = newNote;
    await note.save();

    return res.status(200).json( note );
  } catch (err) {
    res.status(500).json(err.name);
  }
});

module.exports = router;

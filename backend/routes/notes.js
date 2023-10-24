const express = require("express");
const fetchuser = require("../middleware/fetchUser");
const router = express.Router();
const Notes = require("../models/Notes");
const { body, validationResult } = require("express-validator");

//ROUTE 1
//Get all notes using GET: "/api/auth/notes"
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    //catching and dealing with errors
    console.error(error.message);
    res.status(500).send("Internal server error occurred");
  }
});

//ROUTE 2
//Add a new note using POST: "/api/auth/addnote"
router.post(
  "/addnote",
  [
    body("title", "Title should be minimum of 3 characters").isLength({
      min: 3,
    }),
    body(
      "description",
      "Description should be minimum of 5 characters"
    ).isLength({
      min: 5,
    }),
  ],
  //DON'T FORGET TO ADD FETCH USER TO THIS ENDPOINT, ELSE WE WONT GET THE USER!
  fetchuser,
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;
      //If validation errors, return bad request and the errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      //if no errors until now, we create a new note
      const note = new Notes({
        title,
        description,
        tag,
        user: req.user.id,
      });

      //await the promise to fulfill
      const savedNote = await note.save();
      res.json(savedNote);
    } catch (error) {
      //catching and dealing with errors
      console.error(error.message);
      res.status(500).send("Internal server error occurred");
    }
  }
);

//ROUTE 3
//Updating an existing note using PUT: "/api/notes/updatenote/:id".
//Login and ID required;
router.put("/updatenote/:id", fetchuser, async (req, res) => {
  //destructuring the request's body
  const { title, description, tag } = req.body;

  //creating a new note object
  const newNote = {};
  //if the elements exit in the request, assign them to respective variables in the
  //new note object
  if (title) {
    newNote.title = title;
  }
  if (description) {
    newNote.description = description;
  }
  if (tag) {
    newNote.tag = tag;
  }

  //find the note if it exits, using the id passed as a parameter
  let note = await Notes.findById(req.params.id);
  //if note not found, return error
  if (!note) {
    return res.status(404).send("Requested note NOT found");
  }

  //making sure the user can modify only his notes
  if (note.user.toString() !== req.user.id) {
    //unauthorized!
    return res.status(401).send("Access Denied");
  }

  //after verification, we update the note
  note = await Notes.findByIdAndUpdate(
    req.params.id,
    { $set: newNote },
    { new: true }
  );
  res.json({ note });
});

module.exports = router;

//ROUTE 4
//Deleting an existing note using DELETE: "/api/notes/deletenote/:id".
//Login and ID required;
router.delete("/deletenote/:id", fetchuser, async (req, res) => {
  try {
    //find the note if it exits, using the id passed as a parameter
    let note = await Notes.findById(req.params.id);
    //if note not found, return error
    if (!note) {
      return res.status(404).send("Requested note NOT found");
    }

    //making sure the user can delete only his notes
    if (note.user.toString() !== req.user.id) {
      //unauthorized!
      return res.status(401).send("Access Denied");
    }

    //after verification, we update the note
    note = await Notes.findByIdAndDelete(req.params.id);
    res.json({ Success: "Note has been deleted" });
  } catch (error) {
    //catching and dealing with errors
    console.error(error.message);
    res.status(500).send("Internal server error occurred");
  }
});

module.exports = router;

import React, { useContext } from "react";
import noteContext from "../context/notes/noteContext";
import { useState } from "react";

const AddNote = () => {
  const context = useContext(noteContext);
  const { addNote } = context;

  //creating a blank note
  const [note, setNote] = useState({ title: "", description: "", tag: "default" });

  //making the handle-click function
  const handleClick = (e) => {
    //preventing page reload when we hit submit
    e.preventDefault();
    addNote(note.title, note.description, note.tag);

    //after the note has been added, clear all input fields
    setNote({ title: "", description: "", tag: "default" });
  };

  //making the onChange function
  const onChange = (e) => {
    //whatever changes made into the text box, should
    //be assigned to note...
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <h2>Add a Note</h2>

      {/* taking input for a new note */}
      <form>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            aria-describedby="emailHelp"
            onChange={onChange}
            minLength={5}
            value={note.title}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <input
            type="text"
            className="form-control"
            id="description"
            name="description"
            onChange={onChange}
            minLength={5}
            value={note.description}
            required
          />
        </div>

        {/* disabling the button if form not filled properly! */}
        <button disabled={note.title.length<5 || note.title.length<5} type="submit" className="btn btn-primary" onClick={handleClick}>
          Add to notes...
        </button>
      </form>
    </div>
  );
};

export default AddNote;

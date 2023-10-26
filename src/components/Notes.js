import React, { useContext, useEffect } from "react";
import noteContext from "../context/notes/noteContext";
import NoteItem from "./NoteItem";
import AddNote from "./AddNote";

const Notes = () => {
  const context = useContext(noteContext);
  const { notes, getNotes } = context;

  //using the useEffect hook to run the getNotes function after every modification
  //this will update our notes array on client side after modifications
  useEffect(() => {
    getNotes();
  }, []);

  return (
    <>
      {/* calling the add note component */}
      <AddNote />

      <div className="row my-3">
        <h4>Your Notes...</h4>
        {/* if no notes in the array, display empty message */}
        
        {notes.map((note) => {
          //returning the note item corresponding to each note in the DB
          return <NoteItem key={note._id} note={note} />; //adding a unique key to every note to avoid console warnings
        })}
      </div>
    </>
  );
};

export default Notes;

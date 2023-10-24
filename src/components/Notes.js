import React, { useContext } from "react";
import noteContext from '../context/notes/noteContext';
import NoteItem from "./NoteItem";

const Notes = () => {
    const context = useContext(noteContext);
    const {notes, setNotes} = context;
  return (
    <div className="row my-3">
        <h4>Your Notes...</h4>
      {notes.map((note)=>{
        //returning the note item corresponding to each note in the DB
        return <NoteItem note={note}/>;
      })}
    </div>
  )
}

export default Notes
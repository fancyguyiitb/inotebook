import React from "react";
// import { Link } from "react-router-dom";
import noteContext from "../context/notes/noteContext";
import { useContext } from "react";

const NoteItem = (props) => {
  //destructuring to get data from our props, to add into the Note Item
  const { note } = props;

  //fetching the delete note function rom context
  const context = useContext(noteContext)
  const {deleteNote} = context;
  return (
    <div className="col-md-3">
      {/* using bootstrap cards to display data */}
      <div className="card my-3">
        <div className="card-body">
          <h5 className="card-title">{note.title}</h5>
          <p className="card-text">{note.description}</p>
        </div>

        {/* adding control  buttons to each note */}
        <button type="button" className="btn btn-outline-info py-1" onClick={()=>{}}>
          Edit Note
        </button>
        <button type="button" className="btn btn-outline-info py-1 mt-2" onClick={()=>{deleteNote(note._id)}}>
          Delete Note
        </button>
        
      </div>
    </div>
  );
};

export default NoteItem;

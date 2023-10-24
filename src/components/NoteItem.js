import React from "react";
import { Link } from "react-router-dom";

const NoteItem = (props) => {
  //destructuring to get data from our props, to add into the Note Item
  const { note } = props;
  return (
    <div className="col-md-3">
      {/* using bootstrap cards to display data */}
      <div className="card my-3">
        <div className="card-body">
          <h5 className="card-title">{note.title}</h5>
          <p className="card-text">{note.description}</p>
        </div>
      </div>
    </div>
  );
};

export default NoteItem;

import React, { useState } from "react";
import noteContext from "./noteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  //hardcoding the notes for now...
  const notesInitial = [];

  const [notes, setNotes] = useState(notesInitial);

  //Get all notes
  const getNotes = async () => {
    //API call
    const url = `${host}/api/notes/fetchallnotes`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1MzNhZmE5ODExM2EwNTI0YWI3M2RmZCIsImlhdCI6MTY5Nzk2NTM4OX0.-ZpBhJv8WsICm1COJsvY56YXRZWK0YUtePL7tb_U8BI",
      },
    });

    //taking the response and sending it to front end
    const json = await response.json();
    console.log(json);
    setNotes(json);
  };

  //Add a note
  const addNote = async (title, description, tag) => {
    //API call
    const url = `${host}/api/notes/addnote`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1MzNhZmE5ODExM2EwNTI0YWI3M2RmZCIsImlhdCI6MTY5Nzk2NTM4OX0.-ZpBhJv8WsICm1COJsvY56YXRZWK0YUtePL7tb_U8BI",
      },
      body: JSON.stringify({ title, description, tag }),
    });

    console.log("Adding new note...");
    let note = {
      _id: "653757d5d12a5932bff4ba49",
      user: "6533afa98113a0524ab73dfd",
      title: title,
      description: description,
      tag: tag,
      date: "2023-10-24T05:36:21.015Z",
      __v: 0,
    };

    //pushing the new note into the notes array
    setNotes(notes.concat(note));
  };

  //Delete a note
  const deleteNote = (id) => {
    console.log("Deleted note with id: " + id);

    //deleting the note with that id from the array
    //for this we use the filter function;
    //filter function allows only those notes in the array whose
    //id is different from the one to be deleted
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
  };

  //Edit a note
  const editNote = async (id, title, description, tag) => {
    //API call
    const url = `${host}/api/notes/updatenote/${id}`;
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1MzNhZmE5ODExM2EwNTI0YWI3M2RmZCIsImlhdCI6MTY5Nzk2NTM4OX0.-ZpBhJv8WsICm1COJsvY56YXRZWK0YUtePL7tb_U8BI",
      },
      body: JSON.stringify({ title, description, tag }),
    });

    const json = response.json();

    //editing a note client side logic
    console.log("Modified note with id: " + id);
    //looping through the array to find note with the required ID
    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      if (element._id === id) {
        element.title = title;
        element.tag = tag;
        element.description = description;
      }
    }
  };

  return (
    //exporting all the functions, so as to use them via context API
    <noteContext.Provider
      value={{ notes, getNotes, addNote, deleteNote, editNote }}
    >
      {props.children}
    </noteContext.Provider>
  );
};

export default NoteState;

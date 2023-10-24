import React, { useState } from "react";
import noteContext from "./noteContext";

const NoteState = (props) => {
  //hardcoding the notes for now...
  const notesInitial = [
    {
      _id: "653501dfc34bf83ff715f4b7",
      user: "6533afa98113a0524ab73dfd",
      title: "My note 1",
      description: "My description",
      tag: "personal",
      date: "2023-10-22T11:05:03.975Z",
      __v: 0,
    },
    {
      _id: "653757b1d12a5932bff4ba40",
      user: "6533afa98113a0524ab73dfd",
      title: "My note 2",
      description: "My description1 i hate mondal",
      tag: "personal",
      date: "2023-10-24T05:35:45.410Z",
      __v: 0,
    },
    {
      _id: "653757b6d12a5932bff4ba42",
      user: "6533afa98113a0524ab73dfd",
      title: "My note 3",
      description: "My description1w  i hate mondal",
      tag: "personal",
      date: "2023-10-24T05:35:50.281Z",
      __v: 0,
    },
    {
      _id: "653757bdd12a5932bff4ba44",
      user: "6533afa98113a0524ab73dfd",
      title: "My note 4",
      description: "My s  Ad description1w  i hate mondal",
      tag: "personal",
      date: "2023-10-24T05:35:57.680Z",
      __v: 0,
    },
    {
      _id: "653757c9d12a5932bff4ba47",
      user: "6533afa98113a0524ab73dfd",
      title: "My note 5",
      description: "My s  Ad description1w  i hate mondal22",
      tag: "personal",
      date: "2023-10-24T05:36:09.870Z",
      __v: 0,
    },
    {
      _id: "653757d5d12a5932bff4ba49",
      user: "6533afa98113a0524ab73dfd",
      title: "My note 6",
      description: "My s  Ad description1w  i hate mondal22 puju",
      tag: "personal",
      date: "2023-10-24T05:36:21.015Z",
      __v: 0,
    },
  ];

  const [notes, setNotes] = useState(notesInitial);

  return (
    <noteContext.Provider value={{ notes, setNotes }}>
      {props.children}
    </noteContext.Provider>
  );
};

export default NoteState;

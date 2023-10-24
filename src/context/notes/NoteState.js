import React, { useState } from "react";
import noteContext from "./noteContext";

const NoteState = (props) => {
  const s1 = {
    name: "juju",
    class: "Sixty Nine",
  };

  const [state, setState] = useState(s1);
  const update = ()=> {
    setTimeout(() => {
        setState({
            name: "puju",
            class: "Nixty Sine",
          })
    }, 1000);
  }
  return (
    <noteContext.Provider value={{state, update}}>{props.children}</noteContext.Provider>
  );
};

export default NoteState;

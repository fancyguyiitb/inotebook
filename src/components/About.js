import React, { useEffect } from 'react'
import { useContext } from 'react'
import noteContext from '../context/notes/noteContext'

const About = () => {
    const a = useContext(noteContext)
    useEffect(() => {
      a.update();
      // eslint-disable-next-line
    }, []);

  return (
    //we added the parameters of a to a sate, so we need to use a.state.name etc.
    <div>About {a.state.name} and class {a.state.class}</div>
  )
}

export default About
import React, { useContext, useEffect } from 'react'
import noteContext from '../Context/notes/NoteContext'
import Notes from './Notes'


const Home = (props) => {
    const {showAlert}=props
  return (
   <div>

<div className="container my-3" >
 <Notes showAlert={showAlert}/>
</div>


      {/* <p>editor{a.name} and he is in class {a.class}</p> */}
    </div>
  )
}

export default Home

import React, { useState } from 'react'
import './App.css';
import SignupForm from "./Components/SignupForm"
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import About from './Components/About';
import NoteState from './Context/notes/NoteState';
import Alert from './Components/Alert';
// import TodoList from './Components/Todolist';
import Login from './Components/Login';

import {
  
  Routes,
  Route,
  
} from "react-router-dom";







const type=""
const App = () => {
  const [alert, setalert] = useState(null);
  const showAlert=function(message,type){
     setalert({
      message: message,
      type:type
     })
     setTimeout(() => {
      setalert(null)
     }, 2000);
  }
  
  return (
    <div>
      <NoteState>
      <Navbar />
      {/* <TodoList></TodoList> */}
      
        
      <Alert alert={alert}/>
       
      
      
     <div className="container">
    
    
      
        <Routes>
          <Route path="/" element={<Home showAlert={showAlert}/>}/>
            
       
          <Route path="/about" element={  <About />}/>
          
          
          <Route path="/signupform" element={ <SignupForm showAlert={showAlert}/>}/>
          <Route path="/home" element={ <Home showAlert={showAlert} />}/>
           <Route path='/login' element={<Login showAlert={showAlert}/>}/>
          
          
        </Routes>
        </div>
        </NoteState>
    </div>
  )
}

export default App

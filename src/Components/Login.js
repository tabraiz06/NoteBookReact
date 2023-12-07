import { Eye, EyeOff } from 'lucide-react';
import React, { useState } from 'react'
import {  useNavigate } from 'react-router'
import { Link } from 'react-router-dom';

const Login = (props) => {
   
   const [credentials, setcredentials] = useState({ email:'',password:''});
    let history = useNavigate();

    const onChange = (e) => {
        
        setcredentials({ ...credentials, [e.target.name]: e.target.value })
    }
    const handleSubmit= async (e)=>{
        e.preventDefault();
      
        const response = await fetch(`http://localhost:5000/api/auth/login`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              
            },
            body: JSON.stringify({email: credentials.email, password: credentials.password})
          });

          const json=await response.json()
          console.log(json)
          if(json.success){
            // save the auth token and redirect
            localStorage.setItem('token',json.authtoken)
            props.showAlert('Logged in successfully','Success')
            history('/')
          }
          else{
            props.showAlert('invalid credentials','Error')
          }
    }
    const [password, setpassword] = useState(true);
    const onclick=()=>{
setpassword(!password)
    }
  return (
    <div className='login'>
      <form onSubmit={handleSubmit}>
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
    <input onChange={onChange} value={credentials.email} name='email' type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
    <input onChange={onChange}  value={credentials.passoword} name='password' type={password ? "password":"text"} className="form-control" id="exampleInputPassword1" />
    {password? <Eye className='eye' onClick={onclick}/>: <EyeOff className='eye' onClick={onclick}/>}
  </div>
  
  <button type="submit" className="btn btn-primary">Submit</button>
</form>
<div className='mt-3 d-flex'><p className='mx-3'>Dont have an accout?</p><Link to="/signupform">Sign up </Link></div>
    </div>
    
  )
}

export default Login

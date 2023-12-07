import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import "../App.css";
const SignUpForm = (props) => {
  let history = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    gender: 'male',
    phoneNumber: '',
    password: '',
  });
  const [errors, setErrors] = useState([]);
  const [welcomeMessage, setWelcomeMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit =async (e) => {
    e.preventDefault();
    const validationErrors = [];

    // Validation logic
    if (!formData.name || !formData.email || !formData.phoneNumber || !formData.password) {
      validationErrors.push('All fields are mandatory');
    }
    if (!/^[A-Za-z\s]+$/.test(formData.name)) {
      validationErrors.push('Name must be alphabet');
    }
    if (!formData.email.includes('@')) {
      validationErrors.push('Email must contain @');
    }
    if (!['male', 'female', 'other'].includes(formData.gender)) {
      validationErrors.push('Please identify as male, female, or other');
    }
    if (!/^\d+$/.test(formData.phoneNumber)) {
      validationErrors.push('Phone Number must contain only numbers');
    }
    if (formData.password.length < 6) {
      validationErrors.push('Password must contain at least 6 letters');
    }

    if (validationErrors.length === 0) {
      // Successful form submission
   setWelcomeMessage(`Hello ${formData.email.split('@')[0]}`);
   const response = await fetch(`http://localhost:5000/api/auth/createuser`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      
    },
    body: JSON.stringify({email: formData.email, password: formData.password,name:formData.name})
  });

  const json=await response.json()
  console.log(json)
  if(json.success){
    // save the auth token and redirect
    localStorage.setItem('token',json.authtoken)
    history('/')
    props.showAlert('Account created successfully','success')
  }
  else{
   props.showAlert('invalid credentials','Error') 
  }


      setFormData({
        name: '',
    email: '',
    gender: 'male',
    phoneNumber: '',
    password: '',
      })
      setErrors([])
    } else {
      // Display validation errors

      setErrors(validationErrors);
      setWelcomeMessage("")
    }
  };

  return (
    <div className='signupform'> 
    {welcomeMessage && <p>{welcomeMessage}</p>}
      <form onSubmit={handleSubmit}>
        <input
        className='my-3 p-2'
          type="text"
          name="name"
          data-testid="name"
          value={formData.name}
          onChange={handleInputChange}
          placeholder="Name"
        />
        <input
         className='my-3 p-2'
          type="text"
          name="email"
          data-testid="email"
          value={formData.email}
          onChange={handleInputChange}
          placeholder="Email address"
          required
        />
        <select className='my-3 p-2'
          name="gender"
          data-testid="gender"
          value={formData.gender}
          onChange={handleInputChange}
        >
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
        <input
         className='my-3 p-2'
          type="text"
          name="phoneNumber"
          data-testid="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleInputChange}
          placeholder="Phone Number"
          required
        />
        <input
         className='my-3 p-2 '
          type="password"
          name="password"
          data-testid="password"
          value={formData.password}
          onChange={handleInputChange}
          placeholder="Password"
          minLength={6} required
        />
        <button className='btn-primary btn' data-testid="submit" type="submit">
          Submit
        </button>
      </form>
      <div>
       
        {errors.length > 0 && (
          <ul>
            {errors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default SignUpForm;

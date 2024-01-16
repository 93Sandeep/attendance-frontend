import React, { useState } from 'react';
import axios from 'axios';
import '../Css/Signup.css'
import { useNavigate } from 'react-router-dom';

import companyLogo from '../Images/codalien_logo.jpeg';




const Signup = () => {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async () => {
    try {
      const response = await axios.post('http://localhost:8000/auth/signup', {
        name,
        code,
        email,
        password,
      });

      console.log(response.data); 
      if (response.status === 201) {
        navigate('/login');
      }
    
    } catch (error) {
      console.error('Error during signup:', error.message);
    }
  };

  return (
    <div className="signup-container">
      <h2>Signup</h2>
      <img src={companyLogo} alt="" />

      <form>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="code">Employee Code:</label>
          <input type="text" id="code" value={code} onChange={(e) => setCode(e.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="button" onClick={handleSignup}>
          Signup
        </button>
      </form>
    </div>
  );
};

export default Signup;

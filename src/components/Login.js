import React, { useState } from 'react';
import { useNavigate} from 'react-router-dom';
import axios from 'axios';
import '../Css/Login.css';
import companyLogo from '../Images/codalien_logo.jpeg';



const Login = ({loginHandler}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
   
  const navigate = useNavigate();

  const handleLogin = async () => {
    console.log(loginHandler)
    await loginHandler(username, password);
   
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <img src={companyLogo} alt="" />
      <form>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
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
        <button type="button" onClick={handleLogin}>
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;

import React, { useState, useEffect } from 'react';
import { useAuth } from './context/AuthContext';
import {  Route, Routes, useNavigate } from "react-router-dom";
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Login from './components/Login';
import Signup from './components/Signup';
import DailyPresentReport from './components/DailyPresentReport';
import DailyAbsentReport from './components/DailyAbsentReport';
import axios from 'axios';
import './App.css';
import MonthlyReport from './components/MonthlyReport';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { isAuthenticated, login, logout } = useAuth();
  console.log(isAuthenticated);
  // const [authToken, setAuthToken] = useState('');
  const [userData, setUserData] = useState({});

  const navigate = useNavigate();

  // const handleLogin = (token) => {
  //   setAuthToken(token);
  //   setIsLoggedIn(true);
  // };

  const handleLogout = () => {
    
    logout();
    setUserData(null);
  };

  const fetchUserData = async () => {
    try {
      // const response = await axios.get('/users/punchin', {
      //   headers: {
      //     Authorization: `Bearer ${token}`,
      //   },
      // });

      const response = await axios.get('http://localhost:8000/users/punchin');
      console.log("**response**", response);

      const user = response.data[1];
      console.log("**users**", user);
      setUserData({
        usersArr: response.data,
        empCode: user.Empcode,
        name: user.Name,
        inTime: user.INTime,
        outTime: user.OUTTime,
        workingHours: user.WorkTime,
      }, () => {
        console.log("***ye***user: ", user);
      });
    }
    catch (error) {
      console.error('Error fetching user data:', error.message);
    }
  };

  
  const loginHandler = async (username, password) => {
    try {
      const response = await axios.post('http://localhost:8000/auth/login', { code: username, password });
      const token = response.data.token;
      localStorage.setItem("user",token);
      login();
      console.log(response.data); 
      await fetchUserData();
        navigate('/sidebar');
      
      // Fetch user data after login
      // await onFetchUserData(token);
    } catch (error) {
      console.error('Error during login:', error.message);
    }
  }

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      setIsLoggedIn(true);
      fetchUserData();
    }
  }, []);

  return (
    <div className="app">
 <Navbar isLoggedIn={isAuthenticated} onLogout={ handleLogout}/>
      <Routes>
        {/* <Route path='/' element={} /> */}
        <Route path="/login" element={<Login loginHandler={loginHandler} />}>
          {/* <Login onLogin={handleLogin} onFetchUserData={fetchUserData} /> */}
        </Route>
  
        <Route path="/signup" element={<Signup />} />
  
        <Route path="/sidebar" element={<Sidebar userData={userData}/>}>
          {/* {isLoggedIn ? <Sidebar authToken={authToken} userData={userData} /> : <Login />} */}
        </Route>
        <Route path="/monthlyreport" element={<MonthlyReport />} />
        <Route path="/dailypresent" element={<DailyPresentReport/>}>
        </Route>
        <Route path="/dailyabsent" element={<DailyAbsentReport/>}>       
        </Route>
      </Routes>
    </div>
  );  
};

export default App;


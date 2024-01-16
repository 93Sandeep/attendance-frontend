import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { Navigate } from "react-router-dom";

const DailyPresentReport = () => {
  const [reportData, setReportData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const {isAuthenticated,login} =useAuth();

  useEffect(() => {
    login();
    console.log("IsAuthenticated----->", isAuthenticated);
    const fetchUserData = async () => {
    try {
      const response = await axios.get('http://localhost:8000/users/punchin');
        const users = response.data.filter((user) => {
           return user.Status == 'P';
        });
        setReportData(users);
        console.log(users);
     
    } catch (error) {
      console.error('Error fetching user data:', error.message);
    }
  };

  fetchUserData();
  }, []);

  return (
    <>
      
      <div id="dailyreport">
      {!isAuthenticated && <Navigate to="/login" />}
      {isLoading && <p>Loading report...</p>}
        {error && <p>Error fetching report: {error.message}</p>}
      {reportData.length > 0 && (
          <>
          <table className="employee-table">
            <thead>
              <tr>
                <th>
                  <div className="box" id="box1">
                    <span className="box-icon">
                      <i className="fa-solid fa-users-between-lines fa-4x"></i>
                    </span>
                    Employee Code
                  </div>
                </th>
                <th>
                  <div className="box" id="box2">
                    <span className="box-icon">
                      <i className="fas fa-user fa-4x"></i>
                    </span>
                    User
                  </div>
                </th>
                <th>
                  <div className="box" id="box3">
                    <span className="box-icon">
                      <i className="fas fa-sign-in-alt fa-4x"></i>
                    </span>
                    In Time
                  </div>
                </th>
                <th>
                  <div className="box" id="box4">
                    <span className="box-icon">
                      <i className="fas fa-sign-out-alt fa-4x"></i>
                    </span>
                    Out Time
                  </div>
                </th>
                <th>
                  <div className="box" id="box5">
                    <span className="box-icon">
                      <i className="fa-solid fa-stopwatch fa-4x"></i>
                    </span>
                    Working Hours
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="user-info">
              {reportData.map((temp) => (
                <tr key={temp.Empcode}>
                  <td>{temp.Empcode}</td>
                  <td>{temp.Name}</td>
                  <td>{temp.INTime}</td>
                  <td>{temp.OUTTime}</td>
                  <td>{temp.WorkTime}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
      </div>
    </>
  );
};

export default DailyPresentReport;

import React, { useState , useEffect } from 'react';
import '../Css/Sidebar.css';
import Footer from './Footer';
// import DailyAbsentReport from './DailyAbsentReport';
// import DailyPresentReport from './DailyPresentReport';
import { useAuth } from '../context/AuthContext';
import { redirect } from "react-router-dom";
import { Link } from 'react-router-dom';

const Sidebar = ({ userData }) => {
  const [showDailyReport, setShowDailyReport] = useState(false);
  const {isAuthenticated} =useAuth();
  
  console.log("**userData**", userData);

  useEffect(() => {
    if (userData) {
      localStorage.setItem('userData', JSON.stringify(userData));
      console.log('Saved data:', userData);
    }
  }, [userData]);

  useEffect(() => {
    if (!isAuthenticated) {
      redirect("/login");
    }
    const storedData = localStorage.getItem('userData');
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      console.log('Loaded data:', parsedData);
    }
  }, []);

  if (!userData || !userData.usersArr) {
    return null;
  };

  return (
    <div className="container">
      <div className="sidebar">
        <ul>
          <li className="dashboard">Dashboard</li>
          <Link to='/monthlyreport'><li className="monthly-report">Monthly Report</li></Link>
          <Link to='/dailypresent'><li className="daily-p-report" >Daily Present Report</li></Link> 
         <Link to='/dailyabsent'> <li className="absent-report"> Daily Absent Report </li></Link>
          <li className="leave-management">Leave Management</li>
        </ul>
        <div className="sign-out" >
          Sign Out
        </div>
      </div>

      <div className='right-content'>
        <h2>Attendance Management</h2>
        <table className="employee-table">
          <thead>
            <tr>
              <th>
                <div className="box" id='box1'>
                  <span className="box-icon">
                    <i className="fa-solid fa-users-between-lines fa-4x"></i>
                  </span>
                  Employee Code
                </div>
              </th>
              <th>
                <div className="box" id='box2'>
                  <span className="box-icon">
                    <i className="fas fa-user fa-4x"></i>
                  </span>
                  User
                </div>
              </th>
              <th>
                <div className="box" id='box3'>
                  <span className="box-icon">
                    <i className="fas fa-sign-in-alt fa-4x"></i>
                  </span>
                  In Time
                </div>
              </th>
              <th>
                <div className="box" id='box4'>
                  <span className="box-icon">
                    <i className="fas fa-sign-out-alt fa-4x"></i>
                  </span>
                  Out Time
                </div>
              </th>
              <th>
                <div className="box" id='box5'>
                  <span className="box-icon">
                    <i className="fa-solid fa-stopwatch fa-4x"></i>
                  </span>
                  Working Hours
                </div>
              </th>
            </tr>
          </thead>
          <tbody className='user-info'>
            {userData.usersArr.map((temp) => (
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
       
      </div>
      <Footer />
    </div>
  );
};

export default Sidebar;



// import React from 'react';
// import { useEffect } from 'react';

// import '../Css/Sidebar.css';
// import Footer from './Footer';

// const Sidebar = ({ userData }) => {
//   console.log("**userData**", userData)
//   useEffect(() => {
//     if (userData) {
//       localStorage.setItem('userData', JSON.stringify(userData));
//       console.log('Saved data:', userData);
//     }
//   }, [userData]);

//   useEffect(() => {
//     const storedData = localStorage.getItem('userData');
//     if (storedData) {
//       const parsedData = JSON.parse(storedData);
//       console.log('Loaded data:', parsedData);
//     }
//   }, []);
  
//   if (!userData || !userData.usersArr) {
//     return null; 
//   }
  
//   return (
//     <div className="container">
//       <div className="sidebar">
//         <ul>
//           <li className="dashboard">Dashboard</li>
//           <li className="monthly-report">Monthly Report</li>
//           <li className="weekly-report">Weekly Report</li>
//           <li className="leave-management">Leave Management</li>
//         </ul>
//         <div className="sign-out" onClick="">
//           Sign Out
//         </div>
//       </div>
      
   

//       <div className='right-content'>
//       <h2>Attendance Management</h2>
//   {userData && userData.usersArr.map((temp) => (
//     <div className="employee-info" key={temp.Empcode}>
//       <div className="box">
//         <span className="box-icon">
//           <i className="fa-solid fa-users-between-lines fa-4x"></i>
//         </span>
//         <span className='user-info'>Employee code</span>
//         <div className="box-info ">
//         {temp.Empcode}
       
//         </div>
//       </div>
//       <div className="box">
//         <span className="box-icon">
//           <i className="fas fa-user fa-4x"></i>
//         </span>
//         <span className='user-info'>User</span>
//         <div className="box-info">{temp.Name}
       
//         </div>
//       </div>
//       <div className="box">
//         <span className="box-icon">
//           <i className="fas fa-sign-in-alt fa-4x"></i>
//         </span>
//         <span className='user-info'> In Time</span>
//         <div className="box-info">{temp.INTime}
//         </div>
//       </div>
//       <div className="box">
//         <span className="box-icon">
//           <i className="fas fa-sign-out-alt fa-4x"></i>
//         </span>
//         <span className='user-info'>Out Time</span>
//         <div className="box-info">{temp.OUTTime}
//        </div>
//       </div>
//       <div className="box">
//         <span className="box-icon">
//           <i className="fa-solid fa-stopwatch fa-4x"></i>
//         </span>
//         <span className='user-info'>Working Hours</span>
        
//         <div className="box-info">{temp.WorkTime}
       
//         </div>
//       </div>
//     </div>
//   ))}
// </div>
//        <Footer/>
//     </div>
//   );
 
// };


// export default Sidebar;


// import React from 'react';
// import { Link } from 'react-router-dom';
// import logo from '../Images/logo.svg';
// import '../Css/Navbar.css';
// import Footer from './Footer';

// const Navbar = ({ isLoggedIn, onLogout }) => {
//   const handleLogout = () => {
//     console.log('Logout button clicked');
//     onLogout(); 
//   };
//   return (
//     <div className="navbar">
//       <div className="left">
//         <img src={logo} alt="Logo" />
//       </div>
//       <div className="right">
//         {isLoggedIn ? (
//           <button onClick={handleLogout}>Logout</button>
//         ) : (
//           <Link to="/login">
//             <button>Login</button>
//           </Link>
//         )}
//         <Link to="/signup">
//           <button>Signup</button>
//         </Link>
      
//       </div>
//       <Footer/>
//     </div>
   
//   );
// };

// export default Navbar;


import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

import logo from '../Images/logo.svg';
import '../Css/Navbar.css';
import Footer from './Footer';

const Navbar = ({ isLoggedIn, onLogout }) => {

  const navigate = useNavigate();
  console.log("button is ",onLogout);
  console.log("navbarislogin",isLoggedIn);
  const handleLogout = () => {
    console.log('Logout button clicked');
    navigate('/login');

    onLogout();
  };

  return (
    <div className="navbar">
      <div className="left">
        <img src={logo} alt="Logo" />
      </div>
      <div className="right">
        {isLoggedIn ? (
          <button onClick={handleLogout}>Logout</button>
        ) : (
          <>
            <Link to="/login">
              <button>Login</button>
            </Link>
            <Link to="/signup">
              <button>Signup</button>
            </Link>
          </>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Navbar;




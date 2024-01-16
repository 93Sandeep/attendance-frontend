
import React from 'react';
import '../Css/Footer.css'; 

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-logo">
       <p> © 2023 Codalien Technologies Pvt. Ltd.</p>
        </div>
        <div className="footer-links">
          <ul>
            <li><a href="https://codalien.com/privacyPolicy">Privacy Policy</a></li>
            <li><a href="https://codalien.com/">Contact Us</a></li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

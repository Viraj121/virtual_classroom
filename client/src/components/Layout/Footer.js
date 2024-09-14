import React from "react";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <p>
          &copy; {new Date().getFullYear()} Virtual Classroom. All Rights
          Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;

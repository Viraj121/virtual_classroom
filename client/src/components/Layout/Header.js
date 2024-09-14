import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="header">
      <div className="container">
        <h1 className="logo">
          <Link to="/">Virtual Classroom</Link>
        </h1>
        <nav className="nav">
          <Link to="/">Home</Link>
          <Link to="/classes">Classes</Link>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;

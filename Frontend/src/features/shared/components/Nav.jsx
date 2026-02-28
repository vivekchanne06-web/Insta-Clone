import React from "react";
import { Link } from "react-router-dom";
import "./Nav.scss";

const Nav = () => {
  return (
    <nav className="nav-bar">

      {/* LOGO */}
      <div className="nav-left">
        <Link to="/" className="logo">
          InstaClone
        </Link>
      </div>

      {/* NAV LINKS */}
      <div className="nav-center">
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/about" className="nav-link">About</Link>
        <Link to="/CreatePost" className="nav-link">
          Create Post
        </Link>
      </div>

      {/* AUTH LINKS */}
      <div className="nav-right">
        <Link to="/login" className="nav-link">Login</Link>

        <Link to="/Register" className="register-btn">
          Register
        </Link>
      </div>

    </nav>
  );
};

export default Nav;
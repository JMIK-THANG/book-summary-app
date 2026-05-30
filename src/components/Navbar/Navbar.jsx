import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <h2 className="logo">BookSummary</h2>

      <ul className="nav-center">
        <li>
          <Link to="/">Home</Link>
        </li>

        <li>
          <Link to="/library">Library</Link>
        </li>
      </ul>

      <ul className="nav-right">
        <li>
          <Link to="/login">Login</Link>
        </li>

        <li>
          <Link to="/register">Register</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
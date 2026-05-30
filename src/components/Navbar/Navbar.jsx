import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = ({ openLogin, openRegister }) => {
  return (
    <nav className="navbar">
      <Link to="/"  className="logo logo-link">
        <h2>CabuSim</h2>
      </Link>

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
          <button className="login-btn" onClick={openLogin}>
            Login
          </button>
        </li>

        <li className="register-btn">
          <Link to="/register" onClick={openRegister}>
            Register
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;

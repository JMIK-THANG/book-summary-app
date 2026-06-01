import { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = ({ openLogin, openRegister }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <Link to="/" className="logo logo-link" onClick={closeMenu}>
        <h2>CabuSim</h2>
      </Link>

      <button
        className="menu-btn"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        ☰
      </button>

      <div className={`nav-menu ${isMenuOpen ? "active" : ""}`}>
        <ul className="nav-center">
          <li>
            <Link to="/" onClick={closeMenu}>Home</Link>
          </li>

          <li>
            <Link to="/library" onClick={closeMenu}>Library</Link>
          </li>
        </ul>

        <ul className="nav-right">
          <li>
            <button
              className="login-btn"
              onClick={() => {
                openLogin();
                closeMenu();
              }}
            >
              Login
            </button>
          </li>

          <li>
            <button
              className="register-btn"
              onClick={() => {
                openRegister();
                closeMenu();
              }}
            >
              Register
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
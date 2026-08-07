import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import "./Navbar.css";

const Navbar = ({
  openLogin,
  openRegister,
  currentUser,
  logout,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleHomeClick = () => {
    closeMenu();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <nav className="navbar">
      <Link
  to="/"
  className="logo-link"
  onClick={handleHomeClick}
  aria-label="1989 Book Summaries home"
>
  <span className="logo-year">
    198<span className="logo-accent">9</span>
  </span>

  <span className="logo-divider" aria-hidden="true" />

  <span className="logo-title">
    <span>BOOK</span>
    <span>SUMMARIES</span>
  </span>
</Link>

      <button
        type="button"
        className={`menu-btn ${isMenuOpen ? "open" : ""}`}
        onClick={() => setIsMenuOpen((previous) => !previous)}
        aria-label={
          isMenuOpen
            ? "Close navigation menu"
            : "Open navigation menu"
        }
        aria-expanded={isMenuOpen}
        aria-controls="navigation-menu"
      >
        {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      <div
        id="navigation-menu"
        className={`nav-menu ${isMenuOpen ? "active" : ""}`}
      >
        <ul className="nav-center">
          <li>
            <Link to="/" onClick={handleHomeClick}>
              Home
            </Link>
          </li>

          <li>
            <Link to="/library" onClick={closeMenu}>
              Library
            </Link>
          </li>
        </ul>

        <ul className="nav-right">
          {currentUser ? (
            <>
              {currentUser.role === "admin" && (
                <li>
                  <Link to="/admin" onClick={closeMenu}>
                    Admin
                  </Link>
                </li>
              )}

              <li>
                <span className="user-name">
                  Hi, {currentUser.name}
                </span>
              </li>

              <li>
                <button
                  type="button"
                  className="login-btn"
                  onClick={() => {
                    logout();
                    closeMenu();
                  }}
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <button
                  type="button"
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
                  type="button"
                  className="register-btn"
                  onClick={() => {
                    openRegister();
                    closeMenu();
                  }}
                >
                  Register
                </button>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
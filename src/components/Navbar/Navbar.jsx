import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { ArrowRight, Menu, X } from "lucide-react";
import "./Navbar.css";

const Navbar = ({ openLogin, openRegister, currentUser, logout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const closeMenu = () => setIsMenuOpen(false);
  const getNavLinkClass = ({ isActive }) =>
    isActive ? "nav-link active" : "nav-link";

  const handleHomeClick = () => {
    closeMenu();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const accountActions = currentUser ? (
    <>
      {currentUser.role === "admin" && (
        <NavLink to="/admin" className={getNavLinkClass} onClick={closeMenu}>
          Admin
        </NavLink>
      )}
      <span className="user-name">Hi, {currentUser.name}</span>
      <button type="button" className="login-btn" onClick={() => { logout(); closeMenu(); }}>
        Log out
      </button>
    </>
  ) : (
    <>
      <button type="button" className="login-btn" onClick={() => { openLogin(); closeMenu(); }}>
        Sign in
      </button>
      <button type="button" className="register-btn" onClick={() => { openRegister(); closeMenu(); }}>
        <span>Start reading</span>
        <ArrowRight size={18} strokeWidth={2} aria-hidden="true" />
      </button>
    </>
  );

  return (
    <header className="site-header">
      <nav className="navbar" aria-label="Main navigation">
        <Link to="/" className="logo-link" onClick={handleHomeClick} aria-label="1989 Book Summaries home">
          <span className="logo-year">198<span className="logo-accent">9</span></span>
          <span className="logo-divider" aria-hidden="true" />
          <span className="logo-title">Book<br />Summaries</span>
        </Link>

        <ul className="nav-primary" id="navigation-menu">
          <li><NavLink to="/library" className={getNavLinkClass}>Books</NavLink></li>
          <li><NavLink to="/short-reads" className={getNavLinkClass}>Short Reads</NavLink></li>
          <li><NavLink to="/about" className={getNavLinkClass}>About</NavLink></li>
        </ul>

        <div className="nav-account">{accountActions}</div>

        <button type="button" className="menu-btn" onClick={() => setIsMenuOpen((previous) => !previous)} aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"} aria-expanded={isMenuOpen} aria-controls="mobile-navigation-menu">
          {isMenuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>

        <div id="mobile-navigation-menu" className={`mobile-nav-panel ${isMenuOpen ? "active" : ""}`}>
          <NavLink to="/library" className={getNavLinkClass} onClick={closeMenu}>Books</NavLink>
          <NavLink to="/short-reads" className={getNavLinkClass} onClick={closeMenu}>Short Reads</NavLink>
          <NavLink to="/about" className={getNavLinkClass} onClick={closeMenu}>About</NavLink>
          <div className="mobile-account-actions">{accountActions}</div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;

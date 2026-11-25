import { useRef, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { ArrowRight, Menu, X } from "lucide-react";
import "./Navbar.css";

const Navbar = ({ openLogin, openRegister, currentUser, logout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuDialogRef = useRef(null);
  const menuSheetRef = useRef(null);
  const openingAnimationRef = useRef(null);
  const closeMenu = () => menuDialogRef.current?.close();
  const dismissMenu = () => {
    const dialog = menuDialogRef.current;
    if (!dialog?.open || dialog.dataset.closing) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      closeMenu();
      return;
    }

    const start = window.getComputedStyle(dialog).clipPath;
    openingAnimationRef.current?.cancel();
    dialog.dataset.closing = "true";
    const animation = dialog.animate(
      [
        { clipPath: start === "none" ? "circle(72% at 50% 50%)" : start },
        { clipPath: "circle(0% at 50% 50%)" },
      ],
      { duration: 700, easing: "cubic-bezier(.8,0,.6,1)", fill: "forwards" },
    );
    animation.onfinish = () => {
      closeMenu();
      animation.cancel();
      delete dialog.dataset.closing;
    };
  };
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

        <button type="button" className="menu-btn" onClick={() => {
          const dialog = menuDialogRef.current;
          dialog.showModal();
          menuSheetRef.current?.focus({ preventScroll: true });
          setIsMenuOpen(true);
          if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

          openingAnimationRef.current = dialog.animate(
            [
              { clipPath: "circle(0% at 50% 50%)" },
              { clipPath: "circle(72% at 50% 50%)" },
            ],
            { duration: 700, easing: "cubic-bezier(.4,0,.2,1)" },
          );
        }} aria-label="Open navigation menu" aria-haspopup="dialog" aria-expanded={isMenuOpen} aria-controls="mobile-navigation-menu">
          <Menu aria-hidden="true" />
        </button>

        <dialog ref={menuDialogRef} id="mobile-navigation-menu" className="mobile-menu-dialog" aria-label="Navigation menu" onClose={() => setIsMenuOpen(false)} onClick={(event) => {
          if (event.target === event.currentTarget) dismissMenu();
        }} onCancel={(event) => {
          event.preventDefault();
          dismissMenu();
        }}>
          <div ref={menuSheetRef} tabIndex={-1} className="mobile-menu-sheet">
            <div className="mobile-menu-heading">
              <Link to="/" className="logo-link" onClick={handleHomeClick} aria-label="1989 Book Summaries home">
                <span className="logo-year">198<span className="logo-accent">9</span></span>
                <span className="logo-divider" aria-hidden="true" />
                <span className="logo-title">Book<br />Summaries</span>
              </Link>
              <button type="button" className="menu-btn" aria-label="Close navigation menu" onClick={dismissMenu}>
                <X aria-hidden="true" />
              </button>
            </div>
            <div className="mobile-menu-links">
          <NavLink to="/library" className={getNavLinkClass} onClick={closeMenu}>All Book Summaries</NavLink>
          <NavLink to="/short-reads" className={getNavLinkClass} onClick={closeMenu}>Short Reads</NavLink>
          <NavLink to="/about" className={getNavLinkClass} onClick={closeMenu}>About 1989</NavLink>
            </div>
          <div className="mobile-account-actions">{accountActions}</div>
          </div>
        </dialog>
      </nav>
    </header>
  );
};

export default Navbar;

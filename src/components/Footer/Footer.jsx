import { Link } from "react-router-dom";
import "./Footer.css";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-brand">
          <Link to="/" className="footer-logo">
            Cabu<span>Sim</span>
          </Link>

          <p>
            Clear and practical book summaries designed to help readers
            discover valuable ideas in less time.
          </p>
        </div>

        <nav className="footer-navigation" aria-label="Footer navigation">
          <h2>Explore</h2>

          <div className="footer-links">
            <Link to="/">Home</Link>
            <Link to="/library">Library</Link>
          </div>
        </nav>

        <div className="footer-message">
          <h2>Siar Mal • Zir Tam</h2>
          <p>Ni tin thil thar pakhatkhat zir aw.</p>

          <Link to="/library" className="footer-button">
            Explore Books <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {currentYear} CabuSim. All rights reserved.</p>

        <p>
          Designed and developed by{" "}
          <a
            href="https://portfolio-website-sx94.onrender.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Jmik Thang
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
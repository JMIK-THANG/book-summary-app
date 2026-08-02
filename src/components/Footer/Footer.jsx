import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-main">
          <div className="footer-brand">
            <Link to="/" className="footer-logo">
              Cabu<span>Sim</span>
            </Link>

            <p>
              Clear book summaries for curious readers.
            </p>
          </div>

          <nav className="footer-links" aria-label="Footer navigation">
            <Link to="/">Home</Link>
            <Link to="/library">Library</Link>
          </nav>
        </div>

        <div className="footer-bottom">
          <p>© {currentYear} CabuSim. All rights reserved.</p>

          <p>
            Built by{" "}
            <a
              href="https://portfolio-website-sx94.onrender.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Jmik Thang
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
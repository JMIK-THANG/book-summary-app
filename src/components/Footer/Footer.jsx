import { Link } from "react-router-dom";
import { categories } from "../../data/categories";
import "./Footer.css";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-brand">
            <Link to="/" className="footer-logo">
              Cabu<span>Sim</span>
            </Link>

            <p className="footer-description">
              Clear and practical book summaries designed to help curious
              readers learn more in less time.
            </p>

            <p className="footer-language">
              Siar Mal <span>•</span> Zir Tam
            </p>
          </div>

          <nav className="footer-column" aria-label="Explore">
            <h2>Explore</h2>

            <Link
              to="/"
              onClick={() => window.scrollTo({ top: 0, vehavior: "smooth" })}
            >
              Home
            </Link>
            <Link to="/library">Library</Link>
          </nav>

          <nav className="footer-column" aria-label="Book categories">
            <h2>Categories</h2>

            {categories.map((category) => (
              <Link
                key={category.value}
                to={`/library?category=${category.value}`}
              >
                {category.name}
              </Link>
            ))}
          </nav>
        </div>

        <div className="footer-bottom">
          <p>© {currentYear} CabuSim. All rights reserved.</p>

          <p>
            Designed and built by{" "}
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

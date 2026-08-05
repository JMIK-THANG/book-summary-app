import { Link } from "react-router-dom";
import { categories } from "../../data/categories";
import "./Footer.css";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollHomeToTop = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="footer">
      <div className="footer-main">
        <div className="footer-container">
          <div className="footer-intro">
            <div>
              <Link
                to="/"
                className="footer-logo"
                onClick={scrollHomeToTop}
                aria-label="CabuSim home"
              >
                Cabu<span>Sim</span>
              </Link>

              <p className="footer-tagline">
                Big ideas from books, made simple.
              </p>
            </div>

            <nav className="footer-navigation" aria-label="Footer navigation">
              <Link to="/" onClick={scrollHomeToTop}>
                Home
              </Link>

              <Link to="/library">Library</Link>
            </nav>
          </div>

          <div className="footer-category-area">
            <p className="footer-category-title">Explore by category</p>

            <nav
              className="footer-category-list"
              aria-label="Book categories"
            >
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
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-container footer-bottom-content">
          <p>© {currentYear} CabuSim. All rights reserved.</p>

          <p>
            Siar Mal <span aria-hidden="true">•</span> Zir Tam
          </p>

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
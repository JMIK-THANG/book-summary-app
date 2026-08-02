import { Link } from "react-router-dom";

export const HeroSection = ({ featuredBooks = [] }) => {
  const displayedBooks = featuredBooks.slice(0, 3);

  return (
    <section className="hero">
      <div className="hero-container">
        <div className="hero-content">
          <p className="section-label">READ LESS. LEARN MORE.</p>

          <h1>
            Big ideas.
            <span>Short summaries.</span>
          </h1>

          <p className="hero-description">
            Discover powerful ideas from great books in minutes.
          </p>

          <div className="hero-actions">
            <Link to="/library" className="primary-button">
              Explore Library
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>

        {displayedBooks.length > 0 && (
          <div className="hero-books" aria-label="Featured books">
            {displayedBooks.map((book, index) => (
              <Link
                to={`/library/${book.id}`}
                key={book.id}
                className={`hero-book hero-book-${index + 1}`}
                aria-label={`Read ${book.title}`}
              >
                <img
                  src={book.image}
                  alt={`Cover of ${book.title}`}
                />
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
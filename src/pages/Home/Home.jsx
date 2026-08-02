import { Link } from "react-router-dom";
import "./Home.css";

const Home = ({ counts = {}, books = [] }) => {
  const latestBooks = books.slice(0, 4);

  const mostViewedBooks = [...books]
    .sort((a, b) => (b.views ?? 0) - (a.views ?? 0))
    .slice(0, 3);

 const featuredBookIds = [5, 8, 12];

const selectedFeaturedBooks = featuredBookIds
  .map((id) => books.find((book) => Number(book.id) === id))
  .filter(Boolean);

const featuredBooks =
  selectedFeaturedBooks.length === 3
    ? selectedFeaturedBooks
    : books.slice(0, 3);
  return (
    <main className="home">
      {/* Hero */}
      <section className="hero">
        <div className="hero-container">
          <div className="hero-content">
            <p className="section-label">READ LESS. LEARN MORE.</p>

            <h1>
              Big ideas.
              <span> Short summaries.</span>
            </h1>

            <p className="hero-description">
              Discover powerful lessons from great books through clear,
              practical summaries you can read in minutes.
            </p>

            <div className="hero-actions">
              <Link to="/library" className="primary-button">
                Explore Library
                <span aria-hidden="true">→</span>
              </Link>

              <p className="hero-language">Siar Mal • Zir Tam</p>
            </div>

            <div className="hero-stats">
              <div>
                <strong>{counts.totalBooks ?? 0}</strong>
                <span>Book summaries</span>
              </div>

              <div className="hero-stat-divider" aria-hidden="true" />

              <div>
                <strong>{counts.totalUsers ?? 0}</strong>
                <span>Active readers</span>
              </div>
            </div>
          </div>

          {featuredBooks.length > 0 && (
            <div className="hero-books" aria-label="Featured books">
              {featuredBooks.map((book, index) => (
                <Link
                  to={`/library/${book.id}`}
                  key={book.id}
                  className={`hero-book hero-book-${index + 1}`}
                  aria-label={`Read ${book.title}`}
                >
                  <img src={book.image} alt={`Cover of ${book.title}`} />
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Recently added */}
      {latestBooks.length > 0 && (
        <section className="latest-books-section">
          <div className="section-container">
            <div className="section-heading-row">
              <div>
                <p className="section-label">RECENTLY ADDED</p>
                <h2>Start with something new</h2>
                <p>
                  Explore the newest summaries added to the CabuSim library.
                </p>
              </div>

              <Link to="/library" className="text-link">
                View all books
                <span aria-hidden="true">→</span>
              </Link>
            </div>

            <div className="latest-books-grid">
              {latestBooks.map((book) => (
                <Link
                  to={`/library/${book.id}`}
                  key={book.id}
                  className="latest-book-card"
                >
                  <div className="latest-book-cover">
                    <img src={book.image} alt={`Cover of ${book.title}`} />
                    <span className="latest-book-badge">New</span>
                  </div>

                  <div className="latest-book-information">
                    <h3>{book.title}</h3>
                    <p>By {book.author}</p>

                    <span className="latest-book-read">
                      Read summary
                      <span aria-hidden="true">→</span>
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Popular summaries */}
      {mostViewedBooks.length > 0 && (
        <section className="popular-section">
          <div className="section-container">
            <div className="popular-heading">
              <div>
                <p className="section-label">POPULAR SUMMARIES</p>
                <h2>Books readers are exploring</h2>
                <p>
                  Discover some of the most popular ideas in the CabuSim
                  library.
                </p>
              </div>

              <Link to="/library" className="text-link">
                Explore the library
                <span aria-hidden="true">→</span>
              </Link>
            </div>

            <div className="popular-layout">
              {/* Featured popular book */}
              {mostViewedBooks[0] && (
                <Link
                  to={`/library/${mostViewedBooks[0].id}`}
                  className="popular-featured"
                >
                  <div className="popular-featured-cover">
                    <img
                      src={mostViewedBooks[0].image}
                      alt={`Cover of ${mostViewedBooks[0].title}`}
                    />

                    <span className="popular-rank">#01</span>
                  </div>

                  <div className="popular-featured-information">
                    <p className="popular-label">MOST POPULAR</p>

                    <h3>{mostViewedBooks[0].title}</h3>

                    <p className="popular-author">
                      By {mostViewedBooks[0].author}
                    </p>

                    <span className="popular-read-link">
                      Read summary
                      <span aria-hidden="true">→</span>
                    </span>
                  </div>
                </Link>
              )}

              {/* Second and third popular books */}
              <div className="popular-secondary-list">
                {mostViewedBooks.slice(1).map((book, index) => (
                  <Link
                    to={`/library/${book.id}`}
                    key={book.id}
                    className="popular-secondary-card"
                  >
                    <div className="popular-secondary-cover">
                      <img src={book.image} alt={`Cover of ${book.title}`} />

                      <span className="popular-rank">
                        #{String(index + 2).padStart(2, "0")}
                      </span>
                    </div>

                    <div className="popular-secondary-information">
                      <p className="popular-label">POPULAR PICK</p>

                      <h3>{book.title}</h3>

                      <p className="popular-author">By {book.author}</p>

                      <span className="popular-read-link">
                        Read summary
                        <span aria-hidden="true">→</span>
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Why CabuSim */}
      <section className="benefits-section">
        <div className="section-container">
          <div className="benefits-heading">
            <p className="section-label">WHY CABUSIM?</p>
            <h2>A simpler way to discover great books</h2>
            <p>
              Learn the central ideas before deciding what you want to read in
              full.
            </p>
          </div>

          <div className="benefits-grid">
            <article className="benefit">
              <span className="benefit-number">01</span>
              <h3>Clear summaries</h3>
              <p>
                Understand a book’s central ideas without unnecessary details.
              </p>
            </article>

            <article className="benefit">
              <span className="benefit-number">02</span>
              <h3>Easy discovery</h3>
              <p>Find useful books quickly by searching titles and authors.</p>
            </article>

            <article className="benefit">
              <span className="benefit-number">03</span>
              <h3>Reader discussions</h3>
              <p>
                Sign in, share your perspective, and learn from other readers.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="home-cta">
        <div className="home-cta-content">
          <p className="section-label">KEEP LEARNING</p>
          <h2>Your next great idea is waiting.</h2>
          <p>Browse the library and choose your next summary.</p>

          <Link to="/library" className="primary-button">
            Explore all books
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>
    </main>
  );
};

export default Home;

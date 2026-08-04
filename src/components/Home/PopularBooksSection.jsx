import { Link } from "react-router-dom";
import "./PopularBooksSection.css"; 
export const PopularBooksSection = ({ mostViewedBooks }) => {
  if (!mostViewedBooks || mostViewedBooks.length === 0) {
    return null;
  }
  return (
    <section className="popular-section">
      <div className="section-container">
        <div className="popular-heading">
          <div>
            <p className="section-label">POPULAR SUMMARIES</p>
            <h2>Books readers are exploring</h2>
            <p>
              Discover some of the most popular ideas in the CabuSim library.
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

                <p className="popular-author">By {mostViewedBooks[0].author}</p>

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
  );
};

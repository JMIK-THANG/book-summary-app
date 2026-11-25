import { Link } from "react-router-dom";

import "./LatestBooksSection.css"; 

export const LatestBooksSection = ({ latestBooks }) => {
  if (!latestBooks || latestBooks.length === 0) {
    return null;
  }
  return (
    <section className="latest-books-section">
      <div className="section-container">
        <div className="section-heading-row">
          <div>
            <p className="section-label">NEW TO THE LIBRARY</p>
            <h2>Freshly summarized</h2>
            <p>New books, distilled with care and ready when you are.</p>
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
                <p>By {String(book.author || "Unknown author").replace(/^by\s+/i, "")}</p>

                <span className="latest-book-read">Read summary →</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

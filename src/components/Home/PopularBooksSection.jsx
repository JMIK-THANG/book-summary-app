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
            <p className="section-label">MOST READ</p>
            <h2>The books people keep coming back to</h2>
            <p>A reader-led list of the ideas getting the most attention.</p>
          </div>

          <Link to="/library" className="text-link">
            Explore the library
            <span aria-hidden="true">→</span>
          </Link>
        </div>

        <div className="popular-list">
          {mostViewedBooks.map((book, index) => (
            <Link
              to={`/library/${book.id}`}
              key={book.id}
              className="popular-book-row"
            >
              <span className="popular-rank">{String(index + 1).padStart(2, "0")}</span>
              <div className="popular-row-cover">
                <img src={book.image} alt={`Cover of ${book.title}`} />
              </div>
              <div className="popular-row-information">
                <h3>{book.title}</h3>
                <p>By {String(book.author || "Unknown author").replace(/^by\s+/i, "")}</p>
              </div>
              <span className="popular-read-link">Read summary ↗</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

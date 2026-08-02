import { Link } from "react-router-dom";

{
  /* Recently added */
}
export const LatestBooksSection = ({ latestBooks }) => {
  if (!latestBooks || latestBooks.length === 0) {
    return null;
  }
  return (
    <section className="latest-books-section">
      <div className="section-container">
        <div className="section-heading-row">
          <div>
            <p className="section-label">RECENTLY ADDED</p>
            <h2>Start with something new</h2>
            <p>Explore the newest summaries added to the CabuSim library.</p>
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
  );
};

import { Link, useParams } from "react-router-dom";
import "./BookDetails.css";

const BookDetails = ({ books }) => {
  const { id } = useParams();

  const book = books.find((book) => book.id === Number(id));

  if (!book) {
    return (
      <main className="book-details">
        <h1>Book not found</h1>
        <Link to="/library">Back to Library</Link>
      </main>
    );
  }

  return (
    <main className="book-details">
      <Link to="/library" className="back-link">
        ← Back to Library
      </Link>

      <section className="book-hero">
        <div className="book-content">
          <p className="book-label">Book Summary</p>
          <h1>{book.title}</h1>
          <h3>by {book.author}</h3>

          <p className="book-intro">
           Hi cabu ih ruahnak thupi pawl le zirnak man nei pawl cu olte in siar aw
          </p>

          <div className="book-buttons">
            <a href="#summary" className="primary-btn">
              Start Reading
            </a>
          </div>
        </div>

        {book.image && (
          <div className="cover-wrapper">
            <img src={book.image} alt={book.title} className="book-cover" />
          </div>
        )}
      </section>

      <section className="summary-section" id="summary">
        <h2>Summary</h2>
        <p>{book.summary}</p>
      </section>
      <section>
        <Link to="/library" className="secondary-btn">
          Explore More Books
        </Link>
      </section>
    </main>
  );
};

export default BookDetails;

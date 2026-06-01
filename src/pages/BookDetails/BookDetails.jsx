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

  <div className="book-header">
    <div className="book-title-area">
      <h1>{book.title}</h1>
      <h3>{book.author}</h3>
    </div>

    {book.image && (
      <img
        src={book.image}
        alt={book.title}
        className="book-cover"
      />
    )}
  </div>

  <section className="summary-section">
    <h2>Summary</h2>
    <p>{book.summary}</p>
  </section>
</main>
  );
};

export default BookDetails;

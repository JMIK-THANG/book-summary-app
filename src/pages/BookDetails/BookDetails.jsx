import { Link, useParams } from "react-router-dom";
import "./BookDetails.css";

const BookDetails = ({ books }) => {
  const { id } = useParams();
  const book = books.find((book) => book.id === Number(id));

  if (!book) {
    return (
      <main className="book-details">
        <Link to="/library" className="back-link">
          ‹ Back to Books
        </Link>
        <h1>Book not found</h1>
      </main>
    );
  }

  return (
    <main className="book-details">
      <Link to="/library" className="back-link">
        ‹ Back to Books
      </Link>

      <section className="book-top">
        <div className="book-image-card">
          <img src={book.image} alt={book.title} />
        </div>

        <div className="book-info">
          <p className="book-category">BOOK SUMMARY</p>
          <h1>{book.title}</h1>
          <p className="book-author">By {book.author}</p>
        </div>
      </section>

      <section className="about-book">
        <h2>About Book</h2>
        <p>{book.summary}</p>
      </section>
    </main>
  );
};

export default BookDetails;
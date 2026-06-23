import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import "./BookDetails.css";

const BookDetails = ({ books, currentUser }) => {
  const { id } = useParams();
  const book = books.find((book) => book.id === Number(id));

  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");

  const getComments = async () => {
    try {
      const response = await fetch(`http://localhost:5000/comments/${id}`);
      const data = await response.json();

      if (data.status === "success") {
        setComments(data.data);
      }
    } catch (error) {
      console.error("Error fetching comments: ", error);
    }
  };

  useEffect(() => {
    getComments();
  }, [id]);

  const addComment = async (e) => {
    e.preventDefault();

    if (!currentUser?.id) {
      alert("Please login first");
      return;
    }

    if (!comment.trim()) return;

    try {
      const response = await fetch("http://localhost:5000/comments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: currentUser.id,
          book_id: Number(id),
          comment: comment,
        }),
      });

      const data = await response.json();

      if (data.status === "success") {
        setComment("");
        getComments();
      }
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

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

      <section className="comments-section">
        <h2>Comments</h2>

        <form onSubmit={addComment}>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Write a comment..."
          />

          <button type="submit">Post Comment</button>
        </form>

        {comments.length > 0 && (
          <div className="comments-list">
            {comments.map((comment) => (
              <div className="comment-card" key={comment.id}>
                <h3>{comment.name}</h3>
                <p>{comment.comment}</p>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
};

export default BookDetails;

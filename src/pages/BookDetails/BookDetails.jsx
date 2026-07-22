import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import "./BookDetails.css";

const BookDetails = ({ books, currentUser, backendUrl }) => {
  const { id } = useParams();
  const book = books.find((book) => book.id === Number(id));

  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");

  const getComments = async () => {
    try {
      const response = await fetch(`${backendUrl}/comments/${id}`);
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
      const response = await fetch(backendUrl + "/comments", {
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
    <main className="book-details-page">
      <div className="book-details-container">
        <Link to="/library" className="book-back-link">
          ‹ Back to Books
        </Link>

        <section className="book-hero">
          <div className="book-hero-content">
            <p className="book-label">BOOK SUMMARY</p>

            <h1>{book.title}</h1>

            <p className="book-author">By {book.author}</p>

            <div className="book-summary">
              <h2>About the Book</h2>
              <p>{book.summary}</p>
            </div>
          </div>

          <div className="book-cover-container">
            <div className="book-cover-background">
              <img src={book.image} alt={`Cover of ${book.title}`} />
            </div>
          </div>
        </section>

        <section className="book-comments">
          <h2>Comments</h2>

          {currentUser ? (
            <form className="comment-form" onSubmit={addComment}>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Share your thoughts about this book..."
                aria-label="Write a comment"
              />

              <button type="submit">Post Comment</button>
            </form>
          ) : (
            <p className="login-message">Please log in to leave a comment.</p>
          )}

          {comments.length > 0 ? (
            <div className="comments-list">
              {comments.map((item) => (
                <article className="comment-card" key={item.id}>
                  <h3>{item.name}</h3>
                  <p>{item.comment}</p>
                </article>
              ))}
            </div>
          ) : (
            <p className="no-comments">No comments yet.</p>
          )}
        </section>
      </div>
    </main>
  );
};

export default BookDetails;

import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "./BookDetails.css";

const BookDetails = ({
  books = [],
  currentUser,
  backendUrl,
  incrementBookView,
  isLoading = false,
}) => {
  const { id } = useParams();

  const book = books.find(
    (item) => Number(item.id) === Number(id),
  );

  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const getComments = async () => {
    try {
      const response = await fetch(
        `${backendUrl}/comments/${id}`,
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Could not load comments.",
        );
      }

      if (data.status === "success") {
        setComments(data.data);
      }
    } catch (error) {
      console.error("Error fetching comments:", error.message);
    }
  };

  useEffect(() => {
    if (id && backendUrl) {
      getComments();
    }
  }, [id, backendUrl]);

 useEffect(() => {
  if (id) {
    incrementBookView(id);
  }
}, [id]);

  const addComment = async (e) => {
    e.preventDefault();

    if (!currentUser?.id) {
      alert("Please log in first.");
      return;
    }

    const cleanComment = comment.trim();

    if (!cleanComment) return;

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(`${backendUrl}/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token && {
            Authorization: `Bearer ${token}`,
          }),
        },
        body: JSON.stringify({
          user_id: currentUser.id,
          book_id: Number(id),
          comment: cleanComment,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Could not post comment.",
        );
      }

      if (data.status === "success") {
        setComment("");
        await getComments();
      }
    } catch (error) {
      console.error("Error adding comment:", error.message);
    }
  };

  // Loading must be checked before !book.
  if (isLoading) {
    return (
      <main className="book-details-page">
        <div
          className="book-loading"
          role="status"
          aria-live="polite"
        >
          <span className="book-loading-spinner" />
          <p>Loading book...</p>
        </div>
      </main>
    );
  }

  if (!book) {
    return (
      <main className="book-details-page">
        <div className="book-details-container">
          <Link to="/library" className="book-back-link">
            ‹ Back to Books
          </Link>

          <div className="book-not-found">
            <h1>Book not found</h1>
            <p>
              This book may have been removed or the address may
              be incorrect.
            </p>

            <Link to="/library" className="book-library-button">
              Explore Library
            </Link>
          </div>
        </div>
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

            <div className="book-meta">
              <span>{Number(book.views ?? 0)} views</span>
              <span aria-hidden="true">•</span>
              <span>
                {comments.length}{" "}
                {comments.length === 1
                  ? "comment"
                  : "comments"}
              </span>
            </div>

            <div className="book-summary">
              <h2>About the Book</h2>
              <p>{book.summary}</p>
            </div>
          </div>

          <div className="book-cover-container">
            <div className="book-cover-background">
              <img
                src={book.image}
                alt={`Cover of ${book.title}`}
              />
            </div>
          </div>
        </section>

        <section className="book-comments">
          <h2>Comments</h2>

          {currentUser ? (
            <form
              className="comment-form"
              onSubmit={addComment}
            >
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Share your thoughts about this book..."
                aria-label="Write a comment"
              />

              <button type="submit">Post Comment</button>
            </form>
          ) : (
            <p className="login-message">
              Please log in to leave a comment.
            </p>
          )}

          {comments.length > 0 ? (
            <div className="comments-list">
              {comments.map((item) => (
                <article
                  className="comment-card"
                  key={item.id}
                >
                  <h3>{item.name}</h3>
                  <p>{item.comment}</p>
                </article>
              ))}
            </div>
          ) : (
            <p className="no-comments">
              No comments yet. Be the first to share your
              thoughts.
            </p>
          )}
        </section>
      </div>
    </main>
  );
};

export default BookDetails;
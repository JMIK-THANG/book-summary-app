import {
  Link,
  useLocation,
  useParams,
} from "react-router-dom";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import "./BookDetails.css";

const BookDetails = ({
  books = [],
  currentUser,
  backendUrl,
  incrementBookView,
  isLoading = false,
}) => {
  const { id } = useParams();
  const location = useLocation();

  const viewedBookId = useRef(null);

  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const [commentsLoading, setCommentsLoading] =
    useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [commentError, setCommentError] = useState("");

  const book = books.find(
    (item) => Number(item.id) === Number(id),
  );

  // Returns to the filtered Library when state is available.
  const backTo = location.state?.from || "/library";

  const getComments = useCallback(async () => {
    if (!id || !backendUrl) return;

    setCommentsLoading(true);

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
        setComments(
          Array.isArray(data.data) ? data.data : [],
        );
      } else {
        setComments([]);
      }
    } catch (error) {
      console.error(
        "Error fetching comments:",
        error.message,
      );

      setComments([]);
    } finally {
      setCommentsLoading(false);
    }
  }, [id, backendUrl]);

  useEffect(() => {
    getComments();
  }, [getComments]);

  useEffect(() => {
    if (
      !id ||
      typeof incrementBookView !== "function" ||
      viewedBookId.current === id
    ) {
      return;
    }

    viewedBookId.current = id;
    incrementBookView(id);
  }, [id, incrementBookView]);

  const addComment = async (event) => {
    event.preventDefault();

    if (!currentUser?.id) {
      setCommentError("Please log in first.");
      return;
    }

    const cleanComment = comment.trim();

    if (!cleanComment) {
      setCommentError("Please write a comment.");
      return;
    }

    if (!backendUrl) {
      setCommentError("Unable to connect to the server.");
      return;
    }

    setIsSubmitting(true);
    setCommentError("");

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `${backendUrl}/comments`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...(token
              ? {
                  Authorization: `Bearer ${token}`,
                }
              : {}),
          },
          body: JSON.stringify({
            user_id: currentUser.id,
            book_id: Number(id),
            comment: cleanComment,
          }),
        },
      );

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
      console.error(
        "Error adding comment:",
        error.message,
      );

      setCommentError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

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
          <Link to={backTo} className="book-back-link">
            ‹ Back to Books
          </Link>

          <div className="book-not-found">
            <h1>Book not found</h1>

            <p>
              This book may have been removed or the address may
              be incorrect.
            </p>

            <Link
              to="/library"
              className="book-library-button"
            >
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
        <Link to={backTo} className="book-back-link">
          ‹ Back to Books
        </Link>

        <section className="book-hero">
          <div className="book-hero-content">
            <p className="book-label">
              {book.category || "BOOK SUMMARY"}
            </p>

            <h1>{book.title}</h1>

            <p className="book-author">
              By {book.author || "Unknown author"}
            </p>

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

              <p>
                {book.summary ||
                  "No summary is currently available."}
              </p>
            </div>
          </div>

          <div className="book-cover-container">
            <div className="book-cover-background">
              {book.image ? (
                <img
                  src={book.image}
                  alt={`Cover of ${book.title}`}
                />
              ) : (
                <div className="book-cover-placeholder">
                  <span>No cover available</span>
                </div>
              )}
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
                onChange={(event) => {
                  setComment(event.target.value);
                  setCommentError("");
                }}
                placeholder="Share your thoughts about this book..."
                aria-label="Write a comment"
                maxLength={1000}
                required
              />

              <button
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting
                  ? "Posting..."
                  : "Post Comment"}
              </button>

              {commentError && (
                <p className="comment-error" role="alert">
                  {commentError}
                </p>
              )}
            </form>
          ) : (
            <p className="login-message">
              Please log in to leave a comment.
            </p>
          )}

          {commentsLoading ? (
            <p className="comments-loading">
              Loading comments...
            </p>
          ) : comments.length > 0 ? (
            <div className="comments-list">
              {comments.map((item) => (
                <article
                  className="comment-card"
                  key={item.id}
                >
                  <h3>
                    {item.name ||
                      item.username ||
                      "Reader"}
                  </h3>

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
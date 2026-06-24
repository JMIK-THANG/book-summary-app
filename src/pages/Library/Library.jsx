import { useState } from "react";
import { Link } from "react-router-dom";
import AddBookModal from "../AddBookModal/AddBookModal";
import "./Library.css";

const Library = ({ books, addBook, currentUser }) => {
  const [isAddBookOpen, setIsAddBookOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [selectedAuthor, setSelectedAuthor] = useState("all");
  const isAdmin = currentUser?.role === "admin";
  // const isAdmin = currentUser.role === "admin";

  const authors = ["all", ...new Set(books.map((book) => book.author))];

  const filteredBooks = books.filter((book) => {
    const matchesSearch =
      book.title.toLowerCase().includes(searchText.toLowerCase()) ||
      book.author.toLowerCase().includes(searchText.toLowerCase());

    const matchesAuthor =
      selectedAuthor === "all" || book.author === selectedAuthor;

    return matchesSearch && matchesAuthor;
  });

  return (
    <main className="library">
      <div className="library-header">
        <h1>My Library</h1>

        <div className="library-controls">
          <input
            type="text"
            placeholder="Search books..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />

          <select
            value={selectedAuthor}
            onChange={(e) => setSelectedAuthor(e.target.value)}
          >
            {authors.map((author) => (
              <option key={author} value={author}>
                {author === "all" ? "All Authors" : author}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="book-list">
        {filteredBooks.length === 0 ? (
          <p>No books found.</p>
        ) : (
          filteredBooks.map((book) => (
            <Link
              to={`/library/${book.id}`}
              className="book-card"
              key={book.id}
            >
              <img
                src={
                  book.image || "https://via.placeholder.com/300x400?text=Book"
                }
                alt={book.title}
              />

              <div className="book-info">
                <h2>{book.title}</h2>
                <h4>{book.author}</h4>
                <p>{book.summary.slice(0, 100)}...</p>
              </div>
            </Link>
          ))
        )}
      </div>

      {isAdmin && isAddBookOpen && (
        <AddBookModal
          onClose={() => setIsAddBookOpen(false)}
          addBook={addBook}
        />
      )}
    </main>
  );
};

export default Library;

import { useState } from "react";
import { Link } from "react-router-dom";
import AddBookModal from "../AddBookModal/AddBookModal";
import { FiSearch } from "react-icons/fi";
import { HiOutlineUserGroup } from "react-icons/hi2";
import "./Library.css";

const Library = ({ books, addBook, currentUser }) => {
  const [isAddBookOpen, setIsAddBookOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [selectedAuthor, setSelectedAuthor] = useState("all");

  const isAdmin = currentUser?.role === "admin";

  const authors = ["all", ...new Set(books.map((book) => book.author))];

  const filteredBooks = books.filter((book) => {
    const title = book.title || "";
    const author = book.author || "";

    const matchesSearch =
      title.toLowerCase().includes(searchText.toLowerCase()) ||
      author.toLowerCase().includes(searchText.toLowerCase());

    const matchesAuthor = selectedAuthor === "all" || author === selectedAuthor;

    return matchesSearch && matchesAuthor;
  });

  return (
    <main className="library">
      <div className="library-header">
        <div className="library-title-row">
          <h1>My Library</h1>

        </div>

        <div className="library-controls">
          <div className="control-box">
            <FiSearch className="control-icon" />

            <input
              type="text"
              placeholder="Search books..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </div>

          <div className="control-box">
            <HiOutlineUserGroup className="control-icon" />

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
      </div>

      {filteredBooks.length === 0 ? (
        <p className="no-books">No books found.</p>
      ) : (
        <div className="book-list">
          {filteredBooks.map((book) => (
            <Link
              key={book.id}
              to={`/library/${book.id}`}
              className="book-card"
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
                <p>{book.summary?.slice(0, 80)}...</p>

                <div className="read-more">
                  <span>Read Summary</span>
                  <span className="arrow">→</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

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

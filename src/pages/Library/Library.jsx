import { useState } from "react";
import { Link } from "react-router-dom";
import AddBookModal from "../AddBookModal/AddBookModal";
import "./Library.css";

const Library = ({ books, addBook, currentUser }) => {
  const [isAddBookOpen, setIsAddBookOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const isAdmin = currentUser?.role === "admin";
  // const isAdmin = currentUser.role === "admin";
  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(searchText.toLowerCase()),
  );

  return (
    <main className="library">
      <div className="library-header">
        <div>
          <h1>My Library</h1>
        </div>
      </div>

      <input
        className="search-input"
        type="text"
        placeholder="Search books..."
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />

      <div className="book-list">
        {filteredBooks.length === 0 ? (
          <p>No books found.</p>
        ) : (
          filteredBooks.map((book) => (
            <div className="book-card" key={book.id}>
              <img
                src={
                  book.image || "https://via.placeholder.com/300x400?text=Book"
                }
                alt={book.title}
              />

              <h2>{book.title}</h2>
              <h4>{book.author}</h4>
              <p>{book.summary.slice(0, 100)}...</p>

              <div className="book-actions">
                <Link to={`/library/${book.id}`}>Read More</Link>
              </div>
            </div>
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

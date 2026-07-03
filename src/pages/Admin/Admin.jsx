import AddBookModal from "../../pages/AddBookModal/AddBookModal";
import EditBookModal from "../../pages/EditBookModal/EditBookModal";
import { useState } from "react";
import "./Admin.css";

const BOOKS_PER_PAGE = 5;

const Admin = ({ books, addBook, deleteBook, editBook }) => {
  const [isAddBookOpen, setIsAddBookOpen] = useState(false);
  const [isEditBookOpen, setIsEditBookOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredBooks = books.filter((book) =>
    `${book.title} ${book.author}`
      .toLowerCase()
      .includes(searchText.toLowerCase())
  );

  const totalPages = Math.ceil(filteredBooks.length / BOOKS_PER_PAGE);

  const startIndex = (currentPage - 1) * BOOKS_PER_PAGE;
  const currentBooks = filteredBooks.slice(
    startIndex,
    startIndex + BOOKS_PER_PAGE
  );

  const handleSearch = (e) => {
    setSearchText(e.target.value);
    setCurrentPage(1);
  };

  return (
    <main className="admin-page">
      <section className="admin-hero">
        <div>
          <p className="admin-label">CABUSIM ADMIN</p>
          <h1>Manage Book Summaries</h1>
          <p>Add, edit, delete, and organize your book summaries.</p>
        </div>

        <button
          className="admin-add-btn"
          onClick={() => setIsAddBookOpen(true)}
        >
          + Add New Book
        </button>
      </section>

      <section className="admin-stats">
        <div className="stat-card">
          <h3>{books.length}</h3>
          <div>
            <p>Total Books</p>
            <span>All books in your library</span>
          </div>
        </div>

        <div className="stat-card">
          <h3>{filteredBooks.length}</h3>
          <div>
            <p>Showing</p>
            <span>Books match your search</span>
          </div>
        </div>
      </section>

      <section className="admin-books">
        <div className="admin-books-header">
          <h2>All Books</h2>

          <input
            type="text"
            placeholder="Search by title or author..."
            value={searchText}
            onChange={handleSearch}
          />
        </div>

        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Cover</th>
                <th>Title</th>
                <th>Author</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {currentBooks.map((book) => (
                <tr key={book.id}>
                  <td>
                    <img src={book.image} alt={book.title} />
                  </td>

                  <td>{book.title}</td>
                  <td>{book.author}</td>

                  <td>
                    <div className="book-actions">
                      <button
                        onClick={() => {
                          setSelectedBook(book);
                          setIsEditBookOpen(true);
                        }}
                      >
                        Edit
                      </button>

                      <button onClick={() => deleteBook(book.id)}>
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {currentBooks.length === 0 && (
                <tr>
                  <td colSpan="4" className="empty-message">
                    No books found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {filteredBooks.length > BOOKS_PER_PAGE && (
          <div className="pagination">
            <p>
              Showing {startIndex + 1} to{" "}
              {Math.min(startIndex + BOOKS_PER_PAGE, filteredBooks.length)} of{" "}
              {filteredBooks.length} books
            </p>

            <div className="pagination-buttons">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((prev) => prev - 1)}
              >
                ‹
              </button>

              <span>{currentPage}</span>

              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((prev) => prev + 1)}
              >
                ›
              </button>
            </div>
          </div>
        )}
      </section>

      {isAddBookOpen && (
        <AddBookModal
          onClose={() => setIsAddBookOpen(false)}
          addBook={addBook}
        />
      )}

      {isEditBookOpen && selectedBook && (
        <EditBookModal
          book={selectedBook}
          editBook={editBook}
          onClose={() => {
            setIsEditBookOpen(false);
            setSelectedBook(null);
          }}
        />
      )}
    </main>
  );
};

export default Admin;
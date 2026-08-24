import { useState } from "react";
import AddBookModal from "../AddBookModal/AddBookModal";
import EditBookModal from "../EditBookModal/EditBookModal";
import ShortReadModal from "../ShortReadModal/ShortReadModal";
import "./Admin.css";

const BOOKS_PER_PAGE = 5;

const Admin = ({
  books,
  addBook,
  deleteBook,
  editBook,
  shortReads = [],
  addShortRead,
  editShortRead,
  deleteShortRead,
}) => {
  const [activeSection, setActiveSection] = useState("books");
  const [isAddBookOpen, setIsAddBookOpen] = useState(false);
  const [isEditBookOpen, setIsEditBookOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [isShortReadModalOpen, setIsShortReadModalOpen] = useState(false);
  const [selectedShortRead, setSelectedShortRead] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredBooks = books.filter((book) =>
    `${book.title} ${book.author}`
      .toLowerCase()
      .includes(searchText.toLowerCase()),
  );
  const totalPages = Math.ceil(filteredBooks.length / BOOKS_PER_PAGE);
  const startIndex = (currentPage - 1) * BOOKS_PER_PAGE;
  const currentBooks = filteredBooks.slice(startIndex, startIndex + BOOKS_PER_PAGE);

  const openAddForm = () => {
    if (activeSection === "books") {
      setIsAddBookOpen(true);
      return;
    }

    setSelectedShortRead(null);
    setIsShortReadModalOpen(true);
  };

  return (
    <main className="admin-page">
      <section className="admin-hero">
        <div>
          <p className="admin-label">1989 ADMIN</p>
          <h1>Manage Your Content</h1>
          <p>Choose a content type, then add, edit, or remove its entries.</p>
        </div>
        <button type="button" className="admin-add-btn" onClick={openAddForm}>
          {activeSection === "books" ? "+ Add New Book" : "+ Add Short Read"}
        </button>
      </section>

      <nav className="admin-content-tabs" aria-label="Content type">
        <button
          type="button"
          className={activeSection === "books" ? "active" : ""}
          onClick={() => setActiveSection("books")}
          aria-pressed={activeSection === "books"}
        >
          <strong>Books</strong>
          <span>{books.length} summaries</span>
        </button>
        <button
          type="button"
          className={activeSection === "shortReads" ? "active" : ""}
          onClick={() => setActiveSection("shortReads")}
          aria-pressed={activeSection === "shortReads"}
        >
          <strong>Short Reads</strong>
          <span>{shortReads.length} writings</span>
        </button>
      </nav>

      {activeSection === "books" ? (
        <>
          <section className="admin-stats">
            <div className="stat-card">
              <h3>{books.length}</h3>
              <div><p>Total Books</p><span>All books in your library</span></div>
            </div>
            <div className="stat-card">
              <h3>{filteredBooks.length}</h3>
              <div><p>Showing</p><span>Books matching your search</span></div>
            </div>
          </section>

          <section className="admin-books">
            <div className="admin-books-header">
              <h2>All Books</h2>
              <input
                type="text"
                placeholder="Search by title or author..."
                value={searchText}
                onChange={(event) => {
                  setSearchText(event.target.value);
                  setCurrentPage(1);
                }}
              />
            </div>
            <div className="admin-table-wrapper">
              <table className="admin-table">
                <thead><tr><th>Cover</th><th>Title</th><th>Author</th><th>Category</th><th>Actions</th></tr></thead>
                <tbody>
                  {currentBooks.map((book) => (
                    <tr key={book.id}>
                      <td data-label="Cover"><img src={book.image} alt={book.title} /></td>
                      <td data-label="Title">{book.title}</td>
                      <td data-label="Author">{book.author}</td>
                      <td data-label="Category">{book.category || "Uncategorized"}</td>
                      <td data-label="Actions">
                        <div className="book-actions">
                          <button type="button" onClick={() => { setSelectedBook(book); setIsEditBookOpen(true); }}>Edit</button>
                          <button type="button" onClick={() => deleteBook(book.id)}>Delete</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {currentBooks.length === 0 && <tr><td colSpan="5" className="empty-message">No books found.</td></tr>}
                </tbody>
              </table>
            </div>
            {filteredBooks.length > BOOKS_PER_PAGE && (
              <div className="pagination">
                <p>Showing {startIndex + 1} to {Math.min(startIndex + BOOKS_PER_PAGE, filteredBooks.length)} of {filteredBooks.length} books</p>
                <div className="pagination-buttons">
                  <button type="button" disabled={currentPage === 1} onClick={() => setCurrentPage((page) => page - 1)}>‹</button>
                  <span>{currentPage}</span>
                  <button type="button" disabled={currentPage === totalPages} onClick={() => setCurrentPage((page) => page + 1)}>›</button>
                </div>
              </div>
            )}
          </section>
        </>
      ) : (
        <section className="admin-books">
          <div className="admin-books-header">
            <div><p className="admin-section-label">SHORT READS</p><h2>All Short Reads</h2></div>
            <p className="admin-section-count">{shortReads.length} published</p>
          </div>
          <div className="admin-table-wrapper">
            <table className="admin-table short-reads-table">
              <thead><tr><th>Title</th><th>Author</th><th>Preview</th><th>Actions</th></tr></thead>
              <tbody>
                {shortReads.map((item) => (
                  <tr key={item.id}>
                    <td data-label="Title">{item.title}</td>
                    <td data-label="Author">{item.author || "—"}</td>
                    <td data-label="Preview" className="short-read-preview">{item.content}</td>
                    <td data-label="Actions">
                      <div className="book-actions">
                        <button type="button" onClick={() => { setSelectedShortRead(item); setIsShortReadModalOpen(true); }}>Edit</button>
                        <button type="button" onClick={() => deleteShortRead(item.id)}>Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
                {shortReads.length === 0 && <tr><td colSpan="4" className="empty-message">No Short Reads yet. Use “Add Short Read” to publish one.</td></tr>}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {isAddBookOpen && <AddBookModal onClose={() => setIsAddBookOpen(false)} addBook={addBook} />}
      {isEditBookOpen && selectedBook && (
        <EditBookModal book={selectedBook} editBook={editBook} onClose={() => { setIsEditBookOpen(false); setSelectedBook(null); }} />
      )}
      {isShortReadModalOpen && (
        <ShortReadModal
          shortRead={selectedShortRead}
          onClose={() => { setIsShortReadModalOpen(false); setSelectedShortRead(null); }}
          onSave={(formData) => selectedShortRead ? editShortRead(selectedShortRead.id, formData) : addShortRead(formData)}
        />
      )}
    </main>
  );
};

export default Admin;

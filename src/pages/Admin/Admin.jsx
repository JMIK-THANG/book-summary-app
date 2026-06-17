import AddBookModal from "../../pages/AddBookModal/AddBookModal";
import EditBookModal from "../../pages/EditBookModal/EditBookModal";
import { useState } from "react";
import "./Admin.css";

const Admin = ({ books, addBook, deleteBook, editBook }) => {
  const [isAddBookOpen, setIsAddBookOpen] = useState(false);
  const [isEditBookOpen, setIsEditBookOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);

  return (
    <main className="admin-page">
      <section className="admin-hero">
        <div>
          <p className="admin-label">ADMIN PANEL</p>
          <h1>Manage Book Summaries</h1>
          <p>Add, review, and manage your CabuSim book summaries.</p>
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
          <p>Total Books</p>
        </div>

        <div className="stat-card">
          <h3>Admin</h3>
          <p>Current Role</p>
        </div>
      </section>

      <section className="admin-books">
        <h2>All Books</h2>

        <div className="admin-table">
          {books.map((book) => (
            <div className="admin-row" key={book.id}>
              <img src={book.image} alt={book.title} />

              <div className="book-info">
                <h3>{book.title}</h3>
                <p>{book.author}</p>
              </div>

              <div className="book-actions">
                <button
                  onClick={() => {
                    setSelectedBook(book);
                    setIsEditBookOpen(true);
                  }}
                >
                  Edit
                </button>

                <button onClick={() => deleteBook(book.id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
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

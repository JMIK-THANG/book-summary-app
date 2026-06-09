import AddBookModal from "../../pages/AddBookModal/AddBookModal";
import { useState } from "react";
import "./Admin.css";

const Admin = ({ books, addBook }) => {
  const [isAddBookOpen, setIsAddBookOpen] = useState(false);

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

              <div>
                <h3>{book.title}</h3>
                <p>{book.author}</p>
              </div>

              <button>Edit</button>
              <button>Delete</button>
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
    </main>
  );
};

export default Admin;

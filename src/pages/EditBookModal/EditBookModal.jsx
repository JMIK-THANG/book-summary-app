import { useState } from "react";
import "../AddBookModal/AddBookModal.css";

const EditBookModal = ({ book, editBook, onClose }) => {
  const [formData, setFormData] = useState({
    title: book.title,
    author: book.author,
    image: book.image,
    summary: book.summary,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    editBook(book.id, formData);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="add-book-modal">
        <button className="close-btn" onClick={onClose}>
          ×
        </button>

        <form onSubmit={handleSubmit}>
          <h2>Edit Book</h2>

          <input
            type="text"
            name="title"
            placeholder="Book title"
            value={formData.title}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="author"
            placeholder="Author"
            value={formData.author}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="image"
            placeholder="Book image URL"
            value={formData.image}
            onChange={handleChange}
          />

          <textarea
            name="summary"
            placeholder="Book summary"
            value={formData.summary}
            onChange={handleChange}
            required
          />

          <button type="submit">Save Changes</button>
        </form>
      </div>
    </div>
  );
};

export default EditBookModal;

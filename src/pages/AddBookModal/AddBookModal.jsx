import { useState } from "react";
import "./AddBookModal.css";

const AddBookModal = ({ onClose, addBook }) => {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    image: "null",
    summary: "",
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

    addBook(formData);
    onClose();
  };
  const handleImage = (e) => { 
    const file = e.target.files[0]; 
    setFormData((prev) => ({ 
      ...prev, image: file, 
    }))
  }

  return (
    <div className="modal-overlay">
      <div className="add-book-modal">
        <button className="close-btn" onClick={onClose}>
          ×
        </button>

        <form onSubmit={handleSubmit}>
          <h2>Add New Book</h2>

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
            type="file"
            name="image"
            placeholder="Book image URL"
            // value={formData.image}
            onChange={handleImage}
          />

          <textarea
            name="summary"
            placeholder="Book summary"
            value={formData.summary}
            onChange={handleChange}
            required
          />

          <button type="submit">Save Book</button>
        </form>
      </div>
    </div>
  );
};

export default AddBookModal;

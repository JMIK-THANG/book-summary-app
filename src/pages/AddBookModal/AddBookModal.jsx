import { useState } from "react";
import "./AddBookModal.css";

const AddBookModal = ({ onClose, addBook }) => {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    image: "null",
    summary: "",
    category: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await addBook(formData);

    if (result.success) {
      onClose();
    } else {
      alert(result.message);
    }
  };
  const handleImage = (e) => {
    const file = e.target.files[0];
    setFormData((prev) => ({
      ...prev,
      image: file,
    }));
  };

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
         <select
            className="category-select"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          >
            <option value="" disabled>
              Select a category
            </option>
            <option value="Harhdamnak">Harhdamnak</option>
            <option value="Thiamzirnak">Thiamzirnak</option>
            <option value="Santhuanthu">Santhuanthu</option>
            <option value="Thinlungthiamnak">Thinlungthiamnak</option>
            <option value="Nunthuanthu">Nunthuanthu</option>
          </select>
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

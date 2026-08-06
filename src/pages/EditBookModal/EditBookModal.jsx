import { useState } from "react";
import "../AddBookModal/AddBookModal.css";

const EditBookModal = ({ book, editBook, onClose }) => {
  const [formData, setFormData] = useState({
    title: book?.title || "",
    author: book?.author || "",
    summary: book?.summary || "",
    category: book?.category || "",
    image: null,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrorMessage("");
    setIsSubmitting(true);

    const result = await editBook(book.id, formData);

    setIsSubmitting(false);

    if (result.success) {
      onClose();
      return;
    }

    setErrorMessage(result.message);
  };

  return (
    <div
      className="modal-overlay"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget && !isSubmitting) {
          onClose();
        }
      }}
    >
      <div className="add-book-modal">
        <button
          type="button"
          className="close-btn"
          onClick={onClose}
          disabled={isSubmitting}
          aria-label="Close edit book modal"
        >
          ×
        </button>

        <form onSubmit={handleSubmit}>
          <h2>Edit Book</h2>

          {errorMessage && <p className="form-error">{errorMessage}</p>}

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
            type="url"
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

          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : "Save Changes"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditBookModal;

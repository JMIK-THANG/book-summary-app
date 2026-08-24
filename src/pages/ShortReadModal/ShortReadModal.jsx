import { useState } from "react";
import "../AddBookModal/AddBookModal.css";

const ShortReadModal = ({ shortRead, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    title: shortRead?.title || "",
    author: shortRead?.author || "",
    content: shortRead?.content || "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage("");
    setIsSubmitting(true);

    const result = await onSave({
      title: formData.title.trim(),
      author: formData.author.trim(),
      content: formData.content.trim(),
    });

    setIsSubmitting(false);

    if (result.success) onClose();
    else setErrorMessage(result.message);
  };

  return (
    <div
      className="modal-overlay"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget && !isSubmitting) onClose();
      }}
    >
      <div className="add-book-modal">
        <button
          type="button"
          className="close-btn"
          onClick={onClose}
          disabled={isSubmitting}
          aria-label="Close Short Read form"
        >
          ×
        </button>

        <form onSubmit={handleSubmit}>
          <h2>{shortRead ? "Edit Short Read" : "Add Short Read"}</h2>

          {errorMessage && <p className="form-error">{errorMessage}</p>}

          <input
            type="text"
            name="title"
            placeholder="Title"
            value={formData.title}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="author"
            placeholder="Author (optional)"
            value={formData.author}
            onChange={handleChange}
          />

          <textarea
            name="content"
            placeholder="Write your Short Read here..."
            value={formData.content}
            onChange={handleChange}
            required
          />

          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : "Save Short Read"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ShortReadModal;

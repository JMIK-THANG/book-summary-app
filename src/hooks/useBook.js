import { useEffect, useState } from "react";

const useBook = () => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [books, setBooks] = useState([]);
  const [counts, setCounts] = useState({
    totalBooks: 0,
    totalUsers: 0,
  });

  const getBooks = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(`${backendUrl}/books`, {
        headers: token
          ? {
              Authorization: `Bearer ${token}`,
            }
          : {},
      });

      const bookData = await response.json();

      if (!response.ok) {
        throw new Error(
          bookData.message || `Request failed: ${response.status}`,
        );
      }

      setBooks(bookData.data);
    } catch (error) {
      console.error("Get books error:", error.message);
    }
  };

  const addBook = async (newBook) => {
    const formData = new FormData();

    formData.append("title", newBook.title);
    formData.append("author", newBook.author);
    formData.append("summary", newBook.summary);

    if (newBook.image) {
      formData.append("image", newBook.image);
    }

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        return {
          success: false,
          message: "Please log in again.",
        };
      }

      const response = await fetch(`${backendUrl}/books`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const bookData = await response.json();

      if (!response.ok) {
        return {
          success: false,
          message: bookData.message || "Unable to add book.",
        };
      }

      setBooks((previousBooks) => [
        bookData.data,
        ...previousBooks,
      ]);

      return {
        success: true,
        message: "Book added successfully.",
      };
    } catch (error) {
      console.error("Add book error:", error);

      return {
        success: false,
        message: "Could not connect to the server.",
      };
    }
  };

  const editBook = async (id, updatedBook) => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        return {
          success: false,
          message: "Please log in again.",
        };
      }

      const response = await fetch(`${backendUrl}/books/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedBook),
      });

      const bookData = await response.json();

      if (!response.ok) {
        return {
          success: false,
          message:
            bookData.message || "Could not update the book.",
        };
      }

      setBooks((previousBooks) =>
        previousBooks.map((book) =>
          Number(book.id) === Number(id) ? bookData.data : book,
        ),
      );

      return {
        success: true,
        message:
          bookData.message || "Book updated successfully.",
      };
    } catch (error) {
      console.error("Edit book error:", error);

      return {
        success: false,
        message: "Could not connect to the server.",
      };
    }
  };

  const deleteBook = async (id) => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        return {
          success: false,
          message: "Please log in again.",
        };
      }

      const response = await fetch(`${backendUrl}/books/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const bookData = await response.json();

      if (!response.ok) {
        return {
          success: false,
          message:
            bookData.message || "Could not delete the book.",
        };
      }

      setBooks((previousBooks) =>
        previousBooks.filter(
          (book) => Number(book.id) !== Number(id),
        ),
      );

      return {
        success: true,
        message:
          bookData.message || "Book deleted successfully.",
      };
    } catch (error) {
      console.error("Delete book error:", error);

      return {
        success: false,
        message: "Could not connect to the server.",
      };
    }
  };

  const getCounts = async () => {
    try {
      const response = await fetch(
        `${backendUrl}/home/dashboard-stats`,
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch counts");
      }

      if (data.status === "success") {
        setCounts(data.data);
      }
    } catch (error) {
      console.error("Error fetching counts:", error);
    }
  };
const incrementBookView = async (id) => {
  try {
    const response = await fetch(`${backendUrl}/books/${id}/view`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to increment book view");
    }

    // Update the books state with the updated book
    setBooks((previousBooks) =>
      previousBooks.map((book) =>
        Number(book.id) === Number(id) ? data.data : book
      )
    );
  } catch (error) {
    console.error("Error incrementing book view:", error);
  }
};
  useEffect(() => {
    getBooks();
    getCounts();
  }, []);

  return {
    books,
    counts,
    backendUrl,
    addBook,
    editBook,
    deleteBook,
    incrementBookView
  };
};

export default useBook;
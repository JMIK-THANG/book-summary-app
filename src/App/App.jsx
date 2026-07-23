import { Routes, Route, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Home from "../pages/Home/Home";
import Library from "../pages/Library/Library";
import BookDetails from "../pages/BookDetails/BookDetails";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import Navbar from "../components/Navbar/Navbar";
import Admin from "../pages/Admin/Admin";
import ScrollToTop from "../components/ScrollToTop/SCrollToTop";
import Footer from "../components/Footer/Footer";
import "./App.css";

function App() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  // const [currentUser, setCurrentUser] = useState({ role: "admin" });
  const [currentUser, setCurrentUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [books, setBooks] = useState([]);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setCurrentUser(null);
    navigate("/");
  };

  const getBooks = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(`${backendUrl}/books`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
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
  useEffect(() => {
    getBooks();
  }, []);

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

      setBooks((previousBooks) => [bookData.data, ...previousBooks]);

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
        console.error("No authentication token found.");
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
        console.error("Update failed:", bookData);

        return {
          success: false,
          message: bookData.message || "Could not update the book.",
        };
      }

      setBooks((prevBooks) =>
        prevBooks.map((book) =>
          Number(book.id) === Number(id) ? bookData.data : book,
        ),
      );

      return {
        success: true,
        message: bookData.message,
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

      const response = await fetch(`${backendUrl}/books/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const bookData = await response.json();

      if (!response.ok) {
        console.log(bookData);
        return;
      }

      if (bookData.status === "success") {
        setBooks((prevBooks) => prevBooks.filter((book) => book.id !== id));
      }
    } catch (error) {
      console.error("Delete book error:", error);
    }
  };
  const openLogin = () => {
    setIsLoginOpen(true);
    setIsRegisterOpen(false);
  };

  const openRegister = () => {
    setIsRegisterOpen(true);
    setIsLoginOpen(false);
  };

  const closeModals = () => {
    setIsLoginOpen(false);
    setIsRegisterOpen(false);
  };

  return (
    <>
      <Navbar
        openLogin={openLogin}
        openRegister={openRegister}
        currentUser={currentUser}
        logout={logout}
      />

      {isLoginOpen && (
        <Login
          onClose={closeModals}
          openRegister={openRegister}
          setCurrentUser={setCurrentUser}
          backendUrl={backendUrl}
        />
      )}

      {isRegisterOpen && (
        <Register
          onClose={closeModals}
          openLogin={openLogin}
          backendUrl={backendUrl}
        />
      )}
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/library"
          element={
            <Library
              books={books}
              addBook={addBook}
              currentUser={currentUser}
            />
          }
        />
        <Route
          path="/library/:id"
          element={
            <BookDetails
              books={books}
              currentUser={currentUser}
              backendUrl={backendUrl}
            />
          }
        />

        <Route
          path="/admin"
          element={
            currentUser?.role === "admin" ? (
              <Admin
                books={books}
                addBook={addBook}
                deleteBook={deleteBook}
                editBook={editBook}
              />
            ) : (
              <h1>Access Denied</h1>
            )
          }
        />
      </Routes>
      <Footer />
    </>
  );
}

export default App;

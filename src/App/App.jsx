import { Routes, Route, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Home from "../pages/Home/Home";
import Library from "../pages/Library/Library";
import BookDetails from "../pages/BookDetails/BookDetails";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import Navbar from "../components/Navbar/Navbar";
import Admin from "../pages/Admin/Admin";

import "./App.css";

function App() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  // const [currentUser, setCurrentUser] = useState({ role: "admin" });
  const [currentUser, setCurrentUser] = useState(null);
  const [books, setBooks] = useState([]);

  const navigate = useNavigate();
  const logout = () => {
    setCurrentUser(null);
    navigate("/");
  };
  const getBooks = async () => {
    const response = await fetch("http://localhost:5000/books");
    const bookData = await response.json();

    if (bookData.status === "success") {
      setBooks(bookData.data);
    }
  };
  useEffect(() => {
    getBooks();
  }, []);

  const addBook = async (newBooks) => {
    const response = await fetch("http://localhost:5000/books", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newBooks),
    });
    const bookData = await response.json();
    if (bookData.status === "success") {
      setBooks((prevBooks) => [bookData.data, ...prevBooks]);
    }
  };
  const editBook = async (id, updatedBook) => {
    const response = await fetch(`http://localhost:5000/books/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedBook),
    });

    const bookData = await response.json();

    if (bookData.status === "success") {
      setBooks((prevBooks) =>
        prevBooks.map((book) => (book.id === id ? bookData.data : book)),
      );
    }
  };
  const deleteBook = async (id) => {
    console.log(id);
    const response = await fetch(`http://localhost:5000/books/${id}`, {
      method: "DELETE",
    });

    const bookData = await response.json();

    if (bookData.status === "success") {
      setBooks((prevBooks) => prevBooks.filter((book) => book.id !== id));
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
        />
      )}

      {isRegisterOpen && (
        <Register onClose={closeModals} openLogin={openLogin} />
      )}

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
          element={<BookDetails books={books} currentUser={currentUser} />}
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
    </>
  );
}

export default App;

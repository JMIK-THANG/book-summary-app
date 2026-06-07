import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Home from "../pages/Home/Home";
import Library from "../pages/Library/Library";
import BookDetails from "../pages/BookDetails/BookDetails";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import Navbar from "../components/Navbar/Navbar";

import "./App.css";

function App() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState({ role: "admin" });
  const [books, setBooks] = useState(() => {
    const savedBooks = localStorage.getItem("books");
    return savedBooks ? JSON.parse(savedBooks) : [];
  });

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
      <Navbar openLogin={openLogin} openRegister={openRegister} />

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
        <Route path="/library/:id" element={<BookDetails books={books} />} />
      </Routes>
    </>
  );
}

export default App;

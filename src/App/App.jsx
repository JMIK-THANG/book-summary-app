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

  useEffect(() => {
    localStorage.setItem("books", JSON.stringify(books));
  }, [books]);

  const addBook = (newBooks) => {
    setBooks((prevBooks) => [{ id: Date.now(), ...newBooks }, ...prevBooks]);
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
        <Login onClose={closeModals} openRegister={openRegister} />
      )}

      {isRegisterOpen && (
        <Register onClose={closeModals} openLogin={openLogin} />
      )}
      {/* <button onClick={() => setCurrentUser({ role: "admin" })}>
        Admin View
      </button>

      <button onClick={() => setCurrentUser({ role: "user" })}>
        User View
      </button> */}
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

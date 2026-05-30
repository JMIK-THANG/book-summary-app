import { Routes, Route } from "react-router-dom";
import { useState } from "react";

import Home from "../pages/Home/Home";
import Library from "../pages/Library/Library";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import Navbar from "../components/Navbar/Navbar";

import "./App.css";

function App() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

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
      <Navbar openLogin={openLogin} openRegister={openRegister}/>

      {isLoginOpen && (
        <Login
          onClose={closeModals}
          openRegister={openRegister}
        />
      )}

      {isRegisterOpen && (
        <Register
          onClose={closeModals}
          openLogin={openLogin}
        />
      )}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/library" element={<Library />} />
      </Routes>
    </>
  );
}

export default App;
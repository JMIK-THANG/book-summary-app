import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home/Home";
import Library from "../pages/Library/Library";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import Navbar from "../components/Navbar/Navbar";

import "./App.css";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/library" element={<Library />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
}

export default App;


import { Routes, Route} from "react-router-dom"; 
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
// Hooks
import useBook from "../hooks/useBook";
import useModal from "../hooks/useModal";
import useAuthenticate from "../hooks/useAuthenticate";

function App() {
  // Custome hooks import
  const { books, counts, backendUrl, addBook, editBook, deleteBook } =
    useBook();
  const { isLoginOpen, isRegisterOpen, openLogin, openRegister, closeModals } =
    useModal();
const { currentUser,
    setCurrentUser,
    logout,}= useAuthenticate(); 
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
        <Route path="/" element={<Home counts={counts} books={books} />} />
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

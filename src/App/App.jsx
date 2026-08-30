import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home/Home";
import Library from "../pages/Library/Library";
import BookDetails from "../pages/BookDetails/BookDetails";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import ShortReads from "../pages/ShortReads/ShortReads";
import ShortReadDetail from "../pages/ShortReads/ShortReadDetail";
import About from "../pages/About/About";
import Navbar from "../components/Navbar/Navbar";
import Admin from "../pages/Admin/Admin";
import ScrollToTop from "../components/ScrollToTop/SCrollToTop";
import Footer from "../components/Footer/Footer";
import "./App.css";
// Hooks
import useBook from "../hooks/useBook";
import useModal from "../hooks/useModal";
import useAuthenticate from "../hooks/useAuthenticate";
import useShortReads from "../hooks/useShortReads";

function App() {
  // Custome hooks import
  const {
    books,
    counts,
    backendUrl,
    addBook,
    editBook,
    deleteBook,
    incrementBookView,
    isLoading,
  } = useBook();
  const {
    shortReads,
    shortReadsLoading,
    shortReadsError,
    addShortRead,
    editShortRead,
    deleteShortRead,
  } = useShortReads(backendUrl);
  const { isLoginOpen, isRegisterOpen, openLogin, openRegister, closeModals } =
    useModal();
  const { currentUser, setCurrentUser, logout } = useAuthenticate();
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
        <Route path="/about" element={<About />} />
        <Route
          path="/library"
          element={
            <Library
              books={books}
              addBook={addBook}
              currentUser={currentUser}
              isLoading={isLoading}
            />
          }
        />
        <Route
          path="/short-reads"
          element={
            <ShortReads
              shortReads={shortReads}
              isLoading={shortReadsLoading}
              error={shortReadsError}
            />
          }
        />
        <Route
          path="/short-reads/:id"
          element={
            <ShortReadDetail
              shortReads={shortReads}
              isLoading={shortReadsLoading}
              error={shortReadsError}
            />
          }
        />
        <Route
          path="/library/:id"
          element={
            <BookDetails
              books={books}
              currentUser={currentUser}
              isLoading={isLoading}
            />
          }
        />
        <Route
          path="/books/:id"
          element={
            <BookDetails
              books={books}
              currentUser={currentUser}
              backendUrl={backendUrl}
              incrementBookView={incrementBookView}
              isLoading={isLoading}
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
                isLoading={isLoading}
                shortReads={shortReads}
                addShortRead={addShortRead}
                editShortRead={editShortRead}
                deleteShortRead={deleteShortRead}
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

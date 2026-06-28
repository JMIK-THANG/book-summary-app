import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import "./index.css";
import App from "./App/App.jsx";

createRoot(document.getElementById("root")).render(
  <GoogleOAuthProvider clientId="417912331402-uf5kjddeube7rt3gieb40e21pi3lk1ej.apps.googleusercontent.com">
    <BrowserRouter>
      <App />
    </BrowserRouter>
    ,
  </GoogleOAuthProvider>,
);

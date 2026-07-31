import { useState } from "react";
import { useNavigate } from "react-router-dom";

const useAuthenticate = () => {
  const [currentUser, setCurrentUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setCurrentUser(null);
    navigate("/");
  };
  return {
    currentUser,
    setCurrentUser,
    logout,
  };
};
export default useAuthenticate;

import { useState } from "react";
import "./Login.css";

const Login = ({ onClose, openRegister, setCurrentUser }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const checkLogin = async () => {
    const response = await fetch("http://localhost:5000/login", {
      method: "POST",
      header: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: "jmik", password: "jmik" }),
    });
    const userDetail = await response.json();
    setCurrentUser(userDetail.data.role);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    checkLogin();
  };

  return (
    <div className="modal-overlay">
      <div className="login">
        <button type="button" className="close-btn" onClick={onClose}>
          ×
        </button>

        <form onSubmit={handleSubmit}>
          <h2>Login</h2>

          <p className="subtitle">Welcome back to your personal library.</p>

          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            value={formData.email}
            onChange={handleChange}
          />

          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            value={formData.password}
            onChange={handleChange}
          />

          <button type="submit">Login</button>
          <p className="auth-switch">
            New here?
            <button type="button" className="switch-btn" onClick={openRegister}>
              Create an account
            </button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;

import { useState } from "react";
import "./Register.css";

const Register = ({ onClose, openLogin }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

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
  };

  return (
    <div className="modal-overlay">
      <div className="login">
        <button type="button" className="close-btn" onClick={onClose}>
          ×
        </button>

        <form onSubmit={handleSubmit}>
          <h2>Create Account</h2>

          <p className="subtitle">
            Start building your personal knowledge library.
          </p>

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
          />

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
            placeholder="Create Password"
            value={formData.password}
            onChange={handleChange}
          />

          <button type="submit">Create Account</button>

          <p className="auth-switch">
            Already have an account?{" "}
            <button type="button" className="switch-btn" onClick={openLogin}>
              Login
            </button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;

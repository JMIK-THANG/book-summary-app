import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import "./Login.css";

const Login = ({ onClose, openRegister, setCurrentUser, backendUrl }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const checkLogin = async () => {
    const response = await fetch(backendUrl + "/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const userDetail = await response.json();

    if (userDetail.status === "success") {
      localStorage.setItem("token", userDetail.token);
      localStorage.setItem("user", JSON.stringify(userDetail.data));

      setCurrentUser(userDetail.data);
      onClose();

      if (userDetail.data.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/library");
      }
    }
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
    checkLogin();
  };

  const googleResponse = async (authResult) => {
    try {
      const response = await fetch(backendUrl + "/google-login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          code: authResult.code,
        }),
      });

      const userData = await response.json();

      console.log("Google login response:", userData);

      if (userData.user) {
        localStorage.setItem("user", JSON.stringify(userData.user));

        setCurrentUser(userData.user);
        onClose();

        if (userData.user.role === "admin") {
          navigate("/admin");
        } else {
          navigate("/library");
        }
      } else {
        alert(userData.message || "Failed to login with Google.");
      }
    } catch (error) {
      console.error("Google login error:", error);
      alert("Google login failed.");
    }
  };
  const googleLogin = useGoogleLogin({
    onSuccess: googleResponse,
    onError: (error) => {
      console.error("Google login failed:", error);
    },
    flow: "auth-code",
  });
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
            type="text"
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
          <p className="auth-switch">
            Or?
            <button type="button" className="switch-btn" onClick={googleLogin}>
              Login With Google
            </button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;

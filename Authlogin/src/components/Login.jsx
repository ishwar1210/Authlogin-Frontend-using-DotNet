import React, { useState } from "react";
import "./Login.css";
import "./AuthForms.css";
import { auth } from "../api/endpoint";
import loginImage from "../assets/imgi_1_login.svg";

function Login({ onForgot }) {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);
    try {
      const data = await auth.login({
        username: formData.username,
        password: formData.password,
      });

      console.log("Login response:", data);
      const token =
        data?.token ||
        data?.accessToken ||
        (data && typeof data === "string" ? data : null) ||
        data?.data?.token;
      if (token) {
        try {
          localStorage.setItem("token", token);
          localStorage.setItem("bearer", `Bearer ${token}`);
        } catch (e) {
          console.warn("Could not persist token to localStorage", e);
        }
        setSuccess("Login successful — redirecting");
        setTimeout(() => window.location.reload(), 700);
      } else {
        setSuccess("Login successful");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-left">
          <img src={loginImage} alt="login" className="auth-image" />
        </div>

        <div className="auth-right">
          <div className="form-wrapper">
            <h2 className="title">Welcome Back</h2>
            <p className="subtitle">Please login to your account</p>

            <form onSubmit={handleLogin}>
              <div className="input-group">
                <label htmlFor="username">Username</label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  value={formData.username}
                  onChange={handleChange}
                  className="text-input"
                  placeholder="Enter username"
                />
              </div>

              <div className="input-group">
                <label htmlFor="password">Password</label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="text-input"
                  placeholder="Enter password"
                />
              </div>

              <div className="forgot-password">
                <a
                  href="#"
                  className="forgot-link"
                  onClick={(e) => {
                    e.preventDefault();
                    onForgot && onForgot();
                  }}
                >
                  Forgot password?
                </a>
              </div>

              <div className="button-group">
                <button className="primary-btn" type="submit">
                  Sign In
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;

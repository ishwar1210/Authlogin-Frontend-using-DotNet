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
  const [showPassword, setShowPassword] = useState(false);

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
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleChange}
                    className="text-input"
                    placeholder="Enter password"
                    style={{ flex: 1 }}
                  />
                  <button
                    type="button"
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                    onClick={() => setShowPassword((s) => !s)}
                    style={{
                      background: "transparent",
                      border: "none",
                      padding: 6,
                      cursor: "pointer",
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {showPassword ? (
                      // eye-off icon
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M3 3l18 18"
                          stroke="#333"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M10.58 10.58a3 3 0 0 0 4.24 4.24"
                          stroke="#333"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M14.12 16.24C12.9 16.7 11.48 17 9.99 17 6.58 17 3.76 14.6 2 12c.9-1.4 2.34-3.01 4.46-4.22"
                          stroke="#333"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M20.66 13.1c.16-.34.34-.7.5-1.1-1.3-2.3-4.08-4.7-7.67-5.35"
                          stroke="#333"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    ) : (
                      // eye icon
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12z"
                          stroke="#333"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <circle
                          cx="12"
                          cy="12"
                          r="3"
                          stroke="#333"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                  </button>
                </div>
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

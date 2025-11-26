import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { auth } from "../api/endpoint";
import { getRoleFromToken } from "../utils/jwt";
import "./AuthForms.css";

function CreateManager() {
  const token = localStorage.getItem("token");
  const role = getRoleFromToken(token) || "";
  const isAdmin = role.toString().toLowerCase().includes("admin");

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    fullName: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);
    try {
      const data = await auth.registerManager(form);
      setSuccess("Manager created successfully");
      setForm({ username: "", email: "", password: "", fullName: "" });
      toast.success("Manager created successfully", { theme: "colored" });
      console.log("Create manager response", data);
    } catch (err) {
      console.error(err);
      setError(err.message || "Create manager failed");
      toast.error(err.message || "Create manager failed", { theme: "colored" });
    } finally {
      setLoading(false);
    }
  };

  if (!isAdmin)
    return <div style={{ padding: 20 }}>Access denied — admin only</div>;

  return (
    <div className="auth-container">
      <div className="auth-card" style={{ maxWidth: 900 }}>
        <div className="auth-left" style={{ flex: 0.9, display: "none" }}></div>
        <div className="auth-right" style={{ flex: 1 }}>
          <div className="form-wrapper">
            <h2 className="title">Create Manager</h2>
            <form onSubmit={handleSubmit}>
              <div className="input-group">
                <label>Username</label>
                <input
                  name="username"
                  value={form.username}
                  onChange={handleChange}
                  className="text-input"
                />
              </div>
              <div className="input-group">
                <label>Email</label>
                <input
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  className="text-input"
                />
              </div>
              <div className="input-group">
                <label>Full Name</label>
                <input
                  name="fullName"
                  value={form.fullName}
                  onChange={handleChange}
                  className="text-input"
                />
              </div>
              <div className="input-group">
                <label>Password</label>
                <input
                  name="password"
                  type="password"
                  value={form.password}
                  onChange={handleChange}
                  className="text-input"
                />
              </div>

              <div className="button-group">
                <button
                  className="primary-btn"
                  type="submit"
                  disabled={loading}
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      {/* react-toastify container is mounted at app root (App.jsx) */}
    </div>
  );
}

export default CreateManager;

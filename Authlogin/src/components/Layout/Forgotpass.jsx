import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { auth } from "../../api/endpoint";
import "../AuthForms.css";

function Forgotpass({ onDone }) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [token, setToken] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [stage, setStage] = useState(0); // 0: ask email, 1: show token+reset

  const handleForgot = async (e) => {
    e && e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const data = await auth.forgot({ email });
      // backend may return { token: '...' } or similar
      const received = data && (data.token || data.data?.token || data?.token);
      if (received) {
        setToken(received);
        setStage(1);
        toast.success("Reset token received. Use it to set a new password.", {
          theme: "colored",
        });
      } else {
        // if backend doesn't return token, still proceed and inform user
        setStage(1);
        toast.info(
          "If the email exists, you will receive a reset token via email.",
          { theme: "colored" }
        );
      }
    } catch (err) {
      console.error(err);
      setError(err.message || "Failed to request reset token");
      toast.error(err.message || "Failed to request reset token", {
        theme: "colored",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleReset = async (e) => {
    e && e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const payload = { token: token, newPassword };
      await auth.reset(payload);
      toast.success("Password reset successful. Please sign in.", {
        theme: "colored",
      });
      // clear form
      setEmail("");
      setToken("");
      setNewPassword("");
      // notify parent to go back to login view
      if (onDone) onDone();
    } catch (err) {
      console.error(err);
      setError(err.message || "Failed to reset password");
      toast.error(err.message || "Failed to reset password", {
        theme: "colored",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card" style={{ maxWidth: 700 }}>
        <div className="auth-right" style={{ flex: 1 }}>
          <div className="form-wrapper">
            <h2 className="title">Forgot Password</h2>
            {stage === 0 && (
              <form onSubmit={handleForgot}>
                <div className="input-group">
                  <label>Email</label>
                  <input
                    name="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="text-input"
                    required
                  />
                </div>

                <div className="button-group">
                  <button
                    className="primary-btn"
                    type="submit"
                    disabled={loading}
                  >
                    {loading ? "Sending..." : "Send reset token"}
                  </button>
                </div>
                {error && (
                  <div style={{ color: "#b00020", marginTop: 8 }}>{error}</div>
                )}
              </form>
            )}

            {stage === 1 && (
              <form onSubmit={handleReset}>
                <div className="input-group">
                  <label>Token (from response or email)</label>
                  <input
                    name="token"
                    value={token}
                    onChange={(e) => setToken(e.target.value)}
                    className="text-input"
                    placeholder="Reset token"
                    required
                  />
                </div>

                <div className="input-group">
                  <label>New Password</label>
                  <input
                    name="newPassword"
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="text-input"
                    required
                  />
                </div>

                <div className="button-group">
                  <button
                    className="primary-btn"
                    type="submit"
                    disabled={loading}
                  >
                    {loading ? "Resetting..." : "Reset Password"}
                  </button>
                </div>
                <div style={{ marginTop: 8 }}>
                  <button
                    type="button"
                    className="primary-btn"
                    style={{ background: "#666" }}
                    onClick={() => (onDone ? onDone() : setStage(0))}
                  >
                    Back
                  </button>
                </div>
                {error && (
                  <div style={{ color: "#b00020", marginTop: 8 }}>{error}</div>
                )}
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Forgotpass;

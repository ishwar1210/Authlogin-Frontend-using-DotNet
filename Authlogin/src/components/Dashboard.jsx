import React, { useEffect, useState } from "react";
import { parseJwt, getRoleFromToken } from "../utils/jwt";
import { toast } from "react-toastify";

function Dashboard() {
  const token = localStorage.getItem("token");
  const role = getRoleFromToken(token) || "unknown";
  const [count, setCount] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCount = async () => {
      setLoading(true);
      try {
        let url = null;
        if (role.toString().toLowerCase().includes("admin")) {
          url = "https://localhost:7055/api/users/managers";
        } else if (role.toString().toLowerCase().includes("manager")) {
          url = "https://localhost:7055/api/users/employees";
        }

        if (!url) {
          setCount(null);
          return;
        }

        const headers = { "Content-Type": "application/json" };
        const token = localStorage.getItem("token");
        if (token) headers["Authorization"] = `Bearer ${token}`;

        const res = await fetch(url, { method: "GET", headers });
        const text = await res.text();
        let data = null;
        try {
          data = text ? JSON.parse(text) : null;
        } catch (err) {
          data = text;
        }

        if (!res.ok) {
          const message =
            (data && data.message) || `Request failed: ${res.status}`;
          throw new Error(message);
        }

        if (Array.isArray(data)) setCount(data.length);
        else if (
          typeof data === "object" &&
          data !== null &&
          Array.isArray(data.items)
        )
          setCount(data.items.length);
        else setCount(0);
      } catch (err) {
        console.error(err);
        toast.error(err.message || "Failed to load totals", {
          theme: "colored",
        });
        setCount(0);
      } finally {
        setLoading(false);
      }
    };

    fetchCount();
  }, [role]);

  const isAdmin = role.toString().toLowerCase().includes("admin");
  const isManager = role.toString().toLowerCase().includes("manager");

  return (
    <div style={{ padding: 20 }}>
      {(isAdmin || isManager) && (
        <div style={{ marginTop: 18 }}>
          <div className="stat-card">
            <div className="stat-accent" />
            <div className="stat-body">
              <div>
                <div className="stat-label">
                  {isAdmin ? "Total Managers" : "Total Employees"}
                </div>
                <div className="stat-value">{loading ? "..." : count ?? 0}</div>
              </div>
              <div className="stat-icon">
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    d="M12 12c2.761 0 5-2.239 5-5s-2.239-5-5-5-5 2.239-5 5 2.239 5 5 5z"
                    fill="white"
                  />
                  <path
                    d="M4 20c0-3.314 2.686-6 6-6h4c3.314 0 6 2.686 6 6v1H4v-1z"
                    fill="white"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      )}

      {role.toString().toLowerCase().includes("employee") && (
        <div>
          <h3>Employee View</h3>
          <p>Standard employee dashboard</p>
        </div>
      )}
    </div>
  );
}

export default Dashboard;

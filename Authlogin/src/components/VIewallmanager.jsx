import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { users } from "../api/endpoint";
import { getRoleFromToken } from "../utils/jwt";
import "./AuthForms.css";

function ViewAllManagers() {
  const [managers, setManagers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchManagers = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await users.getManagers();
        setManagers(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error(err);
        setError(err.message || "Failed to load managers");
        toast.error(err.message || "Failed to load managers", {
          theme: "colored",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchManagers();
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h2 style={{ marginBottom: 16 }}>Managers</h2>
      {loading && <div>Loading managers...</div>}
      {error && <div style={{ color: "#c00", marginBottom: 12 }}>{error}</div>}

      <div style={{ overflowX: "auto" }}>
        <table
          className="simple-table"
          style={{ width: "100%", borderCollapse: "collapse" }}
        >
          <thead>
            <tr>
              <th style={{ textAlign: "left", padding: "8px 12px" }}>ID</th>
              <th style={{ textAlign: "left", padding: "8px 12px" }}>
                Username
              </th>
              <th style={{ textAlign: "left", padding: "8px 12px" }}>Email</th>
              <th style={{ textAlign: "left", padding: "8px 12px" }}>
                Full Name
              </th>
            </tr>
          </thead>
          <tbody>
            {managers.length === 0 && !loading && (
              <tr>
                <td colSpan={4} style={{ padding: 12 }}>
                  No managers found.
                </td>
              </tr>
            )}
            {managers.map((m) => (
              <tr key={m.id || m._id || m.username}>
                <td
                  style={{ padding: "8px 12px", borderTop: "1px solid #eee" }}
                >
                  {m.id ?? m._id ?? "-"}
                </td>
                <td
                  style={{ padding: "8px 12px", borderTop: "1px solid #eee" }}
                >
                  {m.username ?? "-"}
                </td>
                <td
                  style={{ padding: "8px 12px", borderTop: "1px solid #eee" }}
                >
                  {m.email ?? "-"}
                </td>
                <td
                  style={{ padding: "8px 12px", borderTop: "1px solid #eee" }}
                >
                  {m.fullName ?? m.full_name ?? "-"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ViewAllManagers;

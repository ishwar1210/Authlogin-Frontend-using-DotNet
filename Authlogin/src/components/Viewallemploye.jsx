import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { users } from "../api/endpoint";
import { getRoleFromToken } from "../utils/jwt";
import "./AuthForms.css";

function ViewAllEmployees() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEmployees = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await users.getEmployees();
        setEmployees(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error(err);
        setError(err.message || "Failed to load employees");
        toast.error(err.message || "Failed to load employees", {
          theme: "colored",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h2 style={{ marginBottom: 16 }}>Employees</h2>
      {loading && <div>Loading employees...</div>}
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
            {employees.length === 0 && !loading && (
              <tr>
                <td colSpan={4} style={{ padding: 12 }}>
                  No employees found.
                </td>
              </tr>
            )}
            {employees.map((e) => (
              <tr key={e.id || e._id || e.username}>
                <td
                  style={{ padding: "8px 12px", borderTop: "1px solid #eee" }}
                >
                  {e.id ?? e._id ?? "-"}
                </td>
                <td
                  style={{ padding: "8px 12px", borderTop: "1px solid #eee" }}
                >
                  {e.username ?? "-"}
                </td>
                <td
                  style={{ padding: "8px 12px", borderTop: "1px solid #eee" }}
                >
                  {e.email ?? "-"}
                </td>
                <td
                  style={{ padding: "8px 12px", borderTop: "1px solid #eee" }}
                >
                  {e.fullName ?? e.full_name ?? "-"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ViewAllEmployees;

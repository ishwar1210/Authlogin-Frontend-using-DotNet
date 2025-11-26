import React from "react";
import { parseJwt, getRoleFromToken } from "../../utils/jwt";
import "./Sidebar.css";

function Sidebar({ onSelect }) {
  const token = localStorage.getItem("token");
  const payload = parseJwt(token);

  // extract role using helper (handles many claim shapes)
  const rawRole = getRoleFromToken(token) || null;
  // fallback: if helper failed, try to find role keywords inside payload JSON
  let finalRole = rawRole;
  if (!finalRole && payload) {
    try {
      const dump = JSON.stringify(payload).toLowerCase();
      if (dump.includes("admin")) finalRole = "admin";
      else if (dump.includes("manager")) finalRole = "manager";
      else if (dump.includes("employee")) finalRole = "employee";
    } catch (e) {
      // ignore
    }
  }
  const r = (finalRole || "").toString().toLowerCase();

  const menu = [];
  // Everyone sees Dashboard
  menu.push({ key: "dashboard", label: "Dashboard" });

  // match roles that may include suffixes (e.g. 'Manager_2', 'ROLE_MANAGER')
  if (r.includes("admin")) {
    menu.push({ key: "create-manager", label: "Create Manager" });
    menu.push({ key: "view-managers", label: "View All Managers" });
  } else if (r.includes("manager")) {
    menu.push({ key: "create-employee", label: "Create Employee" });
    menu.push({ key: "view-employees", label: "View All Employees" });
  } else if (r.includes("employee")) {
    // employees only see dashboard (already present)
  }

  const handleLogout = () => {
    localStorage.removeItem("token");
    // reload to reset app state
    window.location.reload();
  };

  return (
    <aside className="app-sidebar">
      <div className="sidebar-header">
        <h3>JMN Infotech</h3>
      </div>

      <ul className="menu-list">
        {menu.map((m) => (
          <li
            key={m.key}
            className="menu-item"
            onClick={() => typeof onSelect === "function" && onSelect(m.key)}
          >
            {m.label}
          </li>
        ))}
      </ul>

      <div className="sidebar-footer">
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;

import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Dashboard from "../Dashboard";
import CreateManager from "../Createmanager";
import ViewAllManagers from "../VIewallmanager";
import ViewAllEmployees from "../Viewallemploye";
import Createemployee from "../Createemployee";
import "./MainLayout.css";
import ProfileHeader from "../ProfileHeader";

function MainLayout() {
  const [page, setPage] = useState("dashboard");

  const renderMain = () => {
    switch (page) {
      case "create-manager":
        return <CreateManager />;

      case "create-employee":
        return <Createemployee />;
      case "view-managers":
        return <ViewAllManagers />;
      case "view-employees":
        return <ViewAllEmployees />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="main-layout">
      <Sidebar onSelect={(key) => setPage(key)} />
      <div style={{ flex: 1 }}>
        <div className="top-bar">
          <ProfileHeader />
        </div>
        <div className="main-area">{renderMain()}</div>
      </div>
    </div>
  );
}

export default MainLayout;

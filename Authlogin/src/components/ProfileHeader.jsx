import React from "react";
import { parseJwt, getRoleFromToken } from "../utils/jwt";
import "./AuthForms.css";

function ProfileHeader() {
  // try token under both 'token' and 'bearer' and strip 'Bearer ' prefix if present
  let token = localStorage.getItem("token") || localStorage.getItem("bearer");
  if (
    token &&
    typeof token === "string" &&
    token.toLowerCase().startsWith("bearer ")
  ) {
    token = token.slice(7).trim();
  }
  const payload = parseJwt(token) || {};

  // try common name fields, Microsoft-style claim URIs, and nested user object fields
  const msName1 =
    payload["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"];
  const msName2 =
    payload["http://schemas.microsoft.com/ws/2008/06/identity/claims/name"];

  const fullName = msName1 || msName2;

  // Prefer Microsoft-style role claims if present
  const msRole =
    payload["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] ||
    payload["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/role"];
  const role = msRole;

  // initials for avatar
  // compute initials: if fullName looks like an email take the left part
  let nameForInitials = fullName;
  if (typeof nameForInitials === "string" && nameForInitials.includes("@")) {
    nameForInitials = nameForInitials.split("@")[0];
  }
  const initials = ("" + nameForInitials)
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((n) => n[0]?.toUpperCase())
    .join("");

  return (
    <div className="profile-card">
      <div className="profile-left">
        <div className="avatar">{initials || "U"}</div>
        <div className="profile-info">
          <div className="profile-name">{fullName}</div>
          <div className="profile-role">Role: {role}</div>
        </div>
      </div>
      <div className="profile-right" />
    </div>
  );
}

export default ProfileHeader;

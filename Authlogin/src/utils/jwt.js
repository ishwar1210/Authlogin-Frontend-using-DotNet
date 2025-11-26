export function parseJwt(token) {
  if (!token) return null;
  const parts = token.split(".");
  if (parts.length < 2) return null;
  const base64Url = parts[1];
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  try {
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );
    return JSON.parse(jsonPayload);
  } catch (e) {
    return null;
  }
}

export function getRoleFromToken(token) {
  const payload = parseJwt(token) || {};

  // Try a number of common claim names and shapes
  const tryVals = [];
  if (payload == null) return null;

  // direct properties
  ["role", "roles", "roleName", "Role", "name", "unique_name", "sub"].forEach(
    (k) => {
      if (payload[k] !== undefined) tryVals.push(payload[k]);
    }
  );

  // Microsoft style claim
  const msRole =
    payload["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] ||
    payload["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/role"];
  if (msRole) tryVals.push(msRole);

  // nested claims
  if (payload.claims && typeof payload.claims === "object") {
    ["role", "roles", "roleName"].forEach((k) => {
      if (payload.claims[k] !== undefined) tryVals.push(payload.claims[k]);
    });
  }

  // evaluate collected values
  for (const v of tryVals) {
    if (!v && v !== 0) continue;
    // string
    if (typeof v === "string" && v.trim()) return v;
    // array of strings
    if (Array.isArray(v) && v.length > 0) {
      // array might be strings or objects
      const first = v[0];
      if (typeof first === "string" && first.trim()) return first;
      if (typeof first === "object") {
        // try common fields
        if (first.name) return first.name;
        if (first.role) return first.role;
      }
    }
    // object
    if (typeof v === "object") {
      if (v.name) return v.name;
      if (v.role) return v.role;
    }
  }

  return null;
}

import axios from "axios";

const api = axios.create({
  baseURL: "https://localhost:7055/api",
  timeout: 15000,
});

// Attach Authorization header from localStorage if present
api.interceptors.request.use((config) => {
  try {
    let token = localStorage.getItem("token") || localStorage.getItem("bearer");
    if (token && typeof token === "string") {
      if (token.toLowerCase().startsWith("bearer "))
        token = token.slice(7).trim();
      if (token) config.headers = config.headers || {};
      config.headers["Authorization"] = `Bearer ${token}`;
    }
  } catch (e) {
    // ignore
  }
  return config;
});

// Return response.data for convenience
api.interceptors.response.use(
  (res) => res.data,
  (err) => {
    // Normalize error so callers can read .message
    const resp = err && err.response;
    if (resp && resp.data) {
      const d = resp.data;
      const msg = d.message || d.error || JSON.stringify(d);
      return Promise.reject(new Error(msg));
    }
    return Promise.reject(err);
  }
);

export default api;

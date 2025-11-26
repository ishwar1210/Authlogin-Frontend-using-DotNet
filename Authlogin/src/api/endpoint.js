import api from "./axiosInstance";

export const auth = {
  login: (payload) => api.post("/auth/login", payload),
  registerManager: (payload) => api.post("/auth/register/manager", payload),
  registerWithRole: (payload) => api.post("/auth/register/with-role", payload),
  forgot: (payload) => api.post("/auth/forgot", payload),
  reset: (payload) => api.post("/auth/reset", payload),
};

export const users = {
  getManagers: () => api.get("/users/managers"),
  getEmployees: () => api.get("/users/employees"),
};

export default {
  auth,
  users,
};

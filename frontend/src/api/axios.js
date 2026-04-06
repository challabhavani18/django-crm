const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api/",
});

// attach token automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  const orgId = localStorage.getItem("org_id");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  if (orgId) {
    config.headers["X-Organization-Id"] = orgId;
  }

  return config;
});

export default api;
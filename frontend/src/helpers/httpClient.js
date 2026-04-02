import axios from "axios";

const HttpClient = axios.create({
  baseURL: "http://127.0.0.1:8000",
});

HttpClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  const org = localStorage.getItem("org_id");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  if (org) {
    config.headers["org"] = org;
  }

  return config;
});

export default HttpClient;
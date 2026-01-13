import axios from "axios";

const api = axios.create({
  baseURL: "https://657e8c4f3e3f5b189463d151.mockapi.io/api/",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;

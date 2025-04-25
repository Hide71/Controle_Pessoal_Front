import axios from "axios";
import { configs } from "eslint-plugin-react-refresh";

const api = axios.create({
  baseURL: "http://localhost:5119",
});
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.warn("Token expirado ou inválido.");
      localStorage.removeItem("access_token");
    }

    return Promise.reject(error);
  }
);

export default api;

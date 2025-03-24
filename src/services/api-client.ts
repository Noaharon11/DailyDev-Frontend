import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      if (config.headers) {
        config.headers.Authorization = `Bearer ${localStorage.getItem(
          "token"
        )}`;
      } else {
        config.headers = {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        };
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 🔄 Interceptor לטיפול בשגיאות 401 (אם ה־token לא תקף)
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      console.warn("⚠️ Unauthorized! Removing token and logging out.");
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("user");
      window.location.href = "/login"; // ניתוב מחדש לדף התחברות
    }
    return Promise.reject(error);
  }
);

export default apiClient;

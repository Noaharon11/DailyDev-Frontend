import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

//  Attach token to every request
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

//  Global error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.isAxiosError) {
      if (error.response?.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        window.location.href = "/login";
      }

      const message =
        error.response?.data?.message ||
        error.message ||
        "Something went wrong";

      return Promise.reject(new Error(message));
    }

    return Promise.reject(error);
  }
);

export default apiClient;

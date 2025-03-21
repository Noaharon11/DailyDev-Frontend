import axios from "axios";

// set API_BASE_URL to the value of the VITE_API_URL environment variable
const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:3000/api";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // Ensures cookies and authentication are handled correctly
});

// add an interceptor to include the Authorization header in all requests
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    console.log("🔍 Sending Token:", token); // ✅ בדיקה אם ה־Token נשלח
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// handle unauthorized responses by logging out the user
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.isAxiosError) {
      if (error.response?.status === 401) {
        console.warn("Unauthorized request - Logging out user...");

        // delete tokens and user from local storage
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        if (typeof window.logoutUser === "function") {
          window.logoutUser();
        } else {
          console.warn("logoutUser function is not defined globally.");
        }
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

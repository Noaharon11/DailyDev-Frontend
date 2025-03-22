// import axios from "axios";

// // set API_BASE_URL to the value of the VITE_API_URL environment variable
// const API_BASE_URL =
//   import.meta.env.VITE_API_URL || "http://localhost:3000/api";

// const apiClient = axios.create({
//   baseURL: API_BASE_URL,
//   withCredentials: true, // Ensures cookies and authentication are handled correctly
// });

// // add an interceptor to include the Authorization header in all requests
// // apiClient.interceptors.request.use(
// //   (config) => {
// //     const token = localStorage.getItem("token");
// //     console.log("🔍 Sending Token:", token); // ✅ בדיקה אם ה־Token נשלח
// //     if (token && config.headers) {
// //       config.headers.Authorization = `Bearer ${token}`;
// //     }
// //     return config;
// //   },
// //   (error) => Promise.reject(error)
// // );

// apiClient.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("token");
//     console.log("📡 Sending Token in request:", token); // ✨ בדיקה קריטית

//     if (token && config.headers) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }

//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// // handle unauthorized responses by logging out the user
// apiClient.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.isAxiosError) {
//       if (error.response?.status === 401) {
//         console.warn("Unauthorized request - Logging out user...");

//         // delete tokens and user from local storage
//         localStorage.removeItem("token");
//         localStorage.removeItem("user");

//         if (typeof window.logoutUser === "function") {
//           window.logoutUser();
//         } else {
//           console.warn("logoutUser function is not defined globally.");
//         }
//       }

//       const message =
//         error.response?.data?.message ||
//         error.message ||
//         "Something went wrong";

//       return Promise.reject(new Error(message));
//     }

//     return Promise.reject(error);
//   }
// );

// export default apiClient;

import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// 🔄 Interceptor להוספת ה־token לכל בקשה
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

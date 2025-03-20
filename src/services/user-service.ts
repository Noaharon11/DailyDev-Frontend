// import apiClient from "./api-client";
// import { CredentialResponse } from "@react-oauth/google";
// import { IUser, AuthResponse } from "../types/index";
// import Alert from "../components/Alert";

// interface LoginData {
//   email: string;
//   password: string;
// }

// interface RegisterData extends LoginData {
//   username: string;
// }

// // Register new user
// // export const registerUser = async (userData: RegisterData): Promise<IUser> => {
// //   const response = await apiClient.post<AuthResponse>(
// //     "/auth/register",
// //     userData
// //   );
// //   const { user, token } = response.data;

// //   localStorage.setItem("token", token);
// //   localStorage.setItem("user", JSON.stringify(user));

// //   return user;
// // };

// export const registerUser = async (userData: {
//   username: string;
//   email: string;
//   password: string;
// }): Promise<IUser> => {
//   const response = await apiClient.post<IUser>("/auth/register", userData);
//   return response.data; // ✅ עכשיו TypeScript יודע שהערך מוחזר כ-IUser
// };

// // Login with email & password
// export const loginUser = async (
//   email: string,
//   password: string
// ): Promise<IUser> => {
//   const response = await apiClient.post<IUser>("/auth/login", {
//     email,
//     password,
//   });
//   return response.data;
// };

// // Google Sign-In
// export const googleSignin = async (credentialResponse: {
//   credential: string;
// }): Promise<IUser> => {
//   const response = await apiClient.post<IUser>(
//     "/auth/googleSignIn",
//     credentialResponse
//   );
//   return response.data;
// };

// // export const googleSignin = async (
// //   credentialResponse: CredentialResponse
// // ): Promise<IUser> => {
// //   const response = await apiClient.post<AuthResponse>(
// //     "/auth/googleSignIn",
// //     credentialResponse
// //   );

// //   const { user, token } = response.data;
// //   localStorage.setItem("token", token);
// //   localStorage.setItem("user", JSON.stringify(user));

// //   return user;
// // };

// // Get current user profile
// export const getUserProfile = async (): Promise<IUser> => {
//   const response = await apiClient.get<IUser>("/profile");
//   return response.data;
// };

// // Update current user profile
// export const updateUserProfile = async (
//   userId: string,
//   updates: Partial<IUser>
// ): Promise<IUser> => {
//   const response = await apiClient.put<IUser>(`/users/${userId}`, updates);
//   return response.data;
// };

// // Logout
// export const logoutUser = async () => {
//   try {
//     const token = localStorage.getItem("token");
//     if (!token) {
//       console.warn("No token found, user is already logged out.");
//       return;
//     }

//     await apiClient.post(
//       "/auth/logout",
//       {},
//       {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       }
//     );
//   } catch (error) {
//     console.error("Logout failed:", error);
//   } finally {
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//   }
// };

// export const fetchUserProfile = async (userId: string): Promise<IUser> => {
//   const response = await apiClient.get<IUser>(`/users/${userId}`);
//   return response.data;
// };

import apiClient from "./api-client";
import { CredentialResponse } from "@react-oauth/google";
import { IUser, AuthResponse } from "../types/index";

// ✅ רישום משתמש חדש
export const registerUser = async (userData: {
  username: string;
  email: string;
  password: string;
}): Promise<IUser> => {
  const response = await apiClient.post<AuthResponse>(
    "/auth/register",
    userData
  );
  const { user, accessToken, refreshToken } = response.data;

  if (!accessToken || !refreshToken) {
    throw new Error("Missing tokens from response");
  }

  localStorage.setItem("token", accessToken);
  localStorage.setItem("refreshToken", refreshToken);
  localStorage.setItem("user", JSON.stringify(user));

  return user;
};

// ✅ התחברות עם מייל וסיסמה
export const loginUser = async (
  email: string,
  password: string
): Promise<IUser> => {
  const response = await apiClient.post<AuthResponse>("/auth/login", {
    email,
    password,
  });

  console.log("🔹 API Response:", response.data); // ✅ נראה בדיוק מה מתקבל מהשרת

  const { user, accessToken, refreshToken } = response.data;

  console.log("✅ User:", user);
  console.log("🔑 Access Token:", accessToken);
  console.log("🔄 Refresh Token:", refreshToken);

  localStorage.setItem("token", accessToken);
  localStorage.setItem("refreshToken", refreshToken);
  localStorage.setItem("user", JSON.stringify(user));

  return user;
};

// ✅ התחברות עם Google
export const googleSignin = async (
  credentialResponse: CredentialResponse
): Promise<IUser> => {
  if (!credentialResponse.credential) {
    throw new Error("Google credential is missing");
  }

  const response = await apiClient.post<AuthResponse>("/auth/googleSignIn", {
    credential: credentialResponse.credential,
  });

  const { user, accessToken, refreshToken } = response.data;

  if (!accessToken || !refreshToken) {
    throw new Error("Missing tokens from response");
  }

  localStorage.setItem("token", accessToken);
  localStorage.setItem("refreshToken", refreshToken);
  localStorage.setItem("user", JSON.stringify(user));

  return user;
};

// ✅ שליפת פרופיל המשתמש המחובר
export const getUserProfile = async (): Promise<IUser> => {
  const response = await apiClient.get<IUser>("/users/profile");
  return response.data;
};

// ✅ שליפת פרופיל משתמש לפי ID
export const fetchUserProfile = async (userId: string): Promise<IUser> => {
  const response = await apiClient.get<IUser>(`/users/${userId}`);
  return response.data;
};

// ✅ עדכון פרופיל משתמש
export const updateUserProfile = async (
  userId: string,
  updates: Partial<IUser>
): Promise<IUser> => {
  const response = await apiClient.put<IUser>(`/users/${userId}`, updates);
  return response.data;
};

// ✅ התנתקות משתמש
export const logoutUser = async (): Promise<void> => {
  try {
    const refreshToken = localStorage.getItem("refreshToken");
    if (!refreshToken) {
      console.warn("No refresh token found, user might already be logged out.");
      return;
    }

    await apiClient.post("/auth/logout", { refreshToken });
  } catch (error) {
    console.error("Logout failed:", error);
  } finally {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
  }
};

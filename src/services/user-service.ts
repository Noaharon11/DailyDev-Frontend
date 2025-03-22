// // import apiClient from "./api-client";
// // import { CredentialResponse } from "@react-oauth/google";
// // import { IUser, AuthResponse } from "../types/index";

// // // Register a new user
// // export const registerUser = async (userData: {
// //   username: string;
// //   email: string;
// //   password: string;
// // }): Promise<AuthResponse> => {
// //   try {
// //     const response = await apiClient.post<AuthResponse>(
// //       "/auth/register",
// //       userData
// //     );
// //     return response.data;
// //   } catch (error) {
// //     console.error("Registration failed:", error);
// //     throw new Error("Registration failed. Please try again.");
// //   }
// // };

// // // Login with email and password
// // export const loginUser = async (
// //   email: string,
// //   password: string
// // ): Promise<AuthResponse> => {
// //   try {
// //     const response = await apiClient.post<AuthResponse>("/auth/login", {
// //       email,
// //       password,
// //     });

// //     if (!response.data || !response.data.user) {
// //       throw new Error("Invalid response from server");
// //     }

// //     return response.data;
// //   } catch (error) {
// //     console.error("Login failed:", error);
// //     throw new Error("Login failed. Please check your credentials.");
// //   }
// // };

// // // Login with Google OAuth
// // export const googleSignin = async (
// //   credentialResponse: CredentialResponse
// // ): Promise<AuthResponse> => {
// //   if (!credentialResponse.credential) {
// //     throw new Error("Google credential is missing");
// //   }

// //   console.log("Sending credential:", credentialResponse.credential);

// //   try {
// //     const response = await apiClient.post<AuthResponse>("/auth/googleSignIn", {
// //       credential: credentialResponse.credential,
// //     });

// //     return response.data;
// //   } catch (error) {
// //     console.error("Google login failed:", error);
// //     throw new Error("Google login failed. Please try again.");
// //   }
// // };

// // // Fetch the logged-in user's profile (✅ תיקון הנתיב)
// // export const getUserProfile = async (): Promise<IUser> => {
// //   try {
// //     const response = await apiClient.get<IUser>("/user/profile"); // ⚠️ שיניתי ל-`/user/profile`
// //     return response.data;
// //   } catch (error) {
// //     console.error("Failed to fetch user profile:", error);
// //     throw new Error("Failed to load user profile.");
// //   }
// // };

// // // Fetch any user profile by ID
// // export const fetchUserProfile = async (userId: string): Promise<IUser> => {
// //   try {
// //     const response = await apiClient.get<IUser>(`/users/${userId}`);
// //     return response.data;
// //   } catch (error) {
// //     console.error(`Failed to fetch user profile for ID: ${userId}`, error);
// //     throw new Error("Failed to load user profile.");
// //   }
// // };

// // // Update user profile
// // export const updateUserProfile = async (
// //   userId: string,
// //   updates: Partial<IUser>
// // ): Promise<IUser> => {
// //   try {
// //     const response = await apiClient.put<IUser>(`/users/${userId}`, updates);
// //     return response.data;
// //   } catch (error) {
// //     console.error("Failed to update user profile:", error);
// //     throw new Error("Failed to update profile.");
// //   }
// // };

// // // Logout user (removes token and refresh token)
// // export const logoutUser = async (): Promise<void> => {
// //   try {
// //     const refreshToken = localStorage.getItem("refreshToken");
// //     if (!refreshToken) {
// //       console.warn("No refresh token found, user might already be logged out.");
// //       return;
// //     }

// //     await apiClient.post("/auth/logout", { refreshToken });
// //   } catch (error) {
// //     console.error("Logout failed:", error);
// //   } finally {
// //     localStorage.removeItem("token");
// //     localStorage.removeItem("refreshToken");
// //     localStorage.removeItem("user");
// //   }
// // };

// import apiClient from "./api-client";
// import { CredentialResponse } from "@react-oauth/google";
// import { IUser, AuthResponse } from "../types/index";

// // Register a new user
// export const registerUser = async (userData: {
//   username: string;
//   email: string;
//   password: string;
// }): Promise<AuthResponse> => {
//   try {
//     const response = await apiClient.post<AuthResponse>(
//       "/auth/register",
//       userData
//     );
//     return response.data;
//   } catch (error) {
//     console.error("Registration failed:", error);
//     throw new Error("Registration failed. Please try again.");
//   }
// };

// // 🔐 Email + Password Login
// export const loginUser = async (
//   email: string,
//   password: string
// ): Promise<{ auth: AuthResponse; user: IUser }> => {
//   const response = await apiClient.post<AuthResponse>("/auth/login", {
//     email,
//     password,
//   });

//   const {
//     accessToken,
//     refreshToken,
//     _id,
//     email: userEmail,
//     username,
//   } = response.data;

//   const user: IUser = { _id, email: userEmail, username };

//   return {
//     auth: { accessToken, refreshToken, _id, email: userEmail, username },
//     user,
//   };
// };

// // 🔐 Google Login
// export const googleSignin = async (
//   credentialResponse: CredentialResponse
// ): Promise<{ auth: AuthResponse; user: IUser }> => {
//   const credential = credentialResponse.credential;
//   if (!credential) throw new Error("Google credential is missing");

//   const response = await apiClient.post<AuthResponse>("/auth/googleSignIn", {
//     credential,
//   });

//   const {
//     accessToken,
//     refreshToken,
//     _id,
//     email: userEmail,
//     username,
//   } = response.data;

//   const user: IUser = { _id, email: userEmail, username };

//   return {
//     auth: { accessToken, refreshToken, _id, email: userEmail, username },
//     user,
//   };
// };

// // export const loginUser = async (
// //   email: string,
// //   password: string
// // ): Promise<AuthResponse> => {
// //   try {
// //     console.log("📤 Sending login request to server...");
// //     const response = await apiClient.post<AuthResponse>("/auth/login", {
// //       email,
// //       password,
// //     });

// //     console.log("✅ Server response:", response);

// //     if (!response.data || !response.data.accessToken) {
// //       console.error("❌ Invalid response from server:", response);
// //       throw new Error("Invalid response from server");
// //     }

// //     const user = {
// //       _id: response.data._id,
// //       email: response.data.email,
// //       username: response.data.username,
// //     };

// //     localStorage.setItem("token", response.data.accessToken);
// //     localStorage.setItem("refreshToken", response.data.refreshToken);
// //     localStorage.setItem("user", JSON.stringify(user));

// //     console.log("✅ Data saved to localStorage:", {
// //       token: response.data.accessToken,
// //       refreshToken: response.data.refreshToken,
// //       user,
// //     });

// //     return {
// //       ...response.data,
// //       user, // ← מוסיפים את זה כדי שתוכלי להשתמש בו בפרונט כרגיל
// //     };
// //   } catch (error) {
// //     console.error("❌ Login request failed:", error);
// //     throw new Error("Invalid email or password.");
// //   }
// // };

// // export const googleSignin = async (
// //   credentialResponse: CredentialResponse
// // ): Promise<AuthResponse> => {
// //   if (!credentialResponse.credential) {
// //     throw new Error("Google credential is missing");
// //   }

// //   console.log("Sending credential:", credentialResponse.credential);

// //   try {
// //     const response = await apiClient.post<AuthResponse>("/auth/googleSignIn", {
// //       credential: credentialResponse.credential,
// //     });

// //     if (
// //       !response.data ||
// //       !response.data.accessToken ||
// //       !response.data.refreshToken
// //     ) {
// //       throw new Error("Invalid response from server");
// //     }

// //     const user = {
// //       _id: response.data._id,
// //       email: response.data.email,
// //       username: response.data.username,
// //     };

// //     localStorage.setItem("token", response.data.accessToken);
// //     localStorage.setItem("refreshToken", response.data.refreshToken);
// //     localStorage.setItem("user", JSON.stringify(user));

// //     return {
// //       ...response.data,
// //       user,
// //     };
// //   } catch (error) {
// //     console.error("Google login failed:", error);
// //     throw new Error("Google login failed. Please try again.");
// //   }
// // };

// // Fetch the logged-in user's profile
// export const getUserProfile = async (): Promise<IUser> => {
//   try {
//     const token = localStorage.getItem("token");
//     if (!token) throw new Error("No token found");

//     const response = await apiClient.get<IUser>("/user/profile", {
//       headers: { Authorization: `Bearer ${token}` },
//     });

//     return response.data;
//   } catch (error) {
//     console.error("Failed to fetch user profile:", error);
//     throw new Error("Failed to load user profile.");
//   }
// };

// // Fetch any user profile by ID
// export const fetchUserProfile = async (userId: string): Promise<IUser> => {
//   try {
//     const response = await apiClient.get<IUser>(`/users/${userId}`);
//     return response.data;
//   } catch (error) {
//     console.error(`Failed to fetch user profile for ID: ${userId}`, error);
//     throw new Error("Failed to load user profile.");
//   }
// };

// // Update user profile
// export const updateUserProfile = async (
//   userId: string,
//   updates: Partial<IUser>
// ): Promise<IUser> => {
//   try {
//     const token = localStorage.getItem("token");
//     if (!token) throw new Error("No token found");

//     const response = await apiClient.put<IUser>(`/users/${userId}`, updates, {
//       headers: { Authorization: `Bearer ${token}` },
//     });

//     return response.data;
//   } catch (error) {
//     console.error("Failed to update user profile:", error);
//     throw new Error("Failed to update profile.");
//   }
// };

// // Logout user (removes token and refresh token)
// export const logoutUser = async (): Promise<void> => {
//   try {
//     const refreshToken = localStorage.getItem("refreshToken");
//     if (!refreshToken) {
//       console.warn("No refresh token found, user might already be logged out.");
//       return;
//     }

//     await apiClient.post("/auth/logout", { refreshToken });
//   } catch (error) {
//     console.error("Logout failed:", error);
//   } finally {
//     localStorage.removeItem("token");
//     localStorage.removeItem("refreshToken");
//     localStorage.removeItem("user");
//   }
// };

// services/user-service.ts
import apiClient from "./api-client";
import { CredentialResponse } from "@react-oauth/google";
import { IUser, AuthResponse } from "../types";

export const registerUser = async (userData: {
  username: string;
  email: string;
  password: string;
}): Promise<{ user: IUser }> => {
  try {
    const response = await apiClient.post("/auth/register", userData);

    const { _id, email, username } = response.data as IUser;
    const user = { _id, email, username };

    // שומרת את המשתמש בלוקאל
    localStorage.setItem("user", JSON.stringify(user));

    return { user };
  } catch (error) {
    console.error("Registration failed:", error);
    throw new Error("Registration failed. Please try again.");
  }
};

export const loginUser = async (
  email: string,
  password: string
): Promise<{ user: IUser; accessToken: string; refreshToken: string }> => {
  const response = await apiClient.post<AuthResponse>("/auth/login", {
    email,
    password,
  });

  const {
    accessToken,
    refreshToken,
    _id,
    username,
    email: userEmail,
  } = response.data;

  const user: IUser = { _id, email: userEmail, username };

  localStorage.setItem("token", accessToken);
  localStorage.setItem("refreshToken", refreshToken);
  localStorage.setItem("user", JSON.stringify(user));

  return { user, accessToken, refreshToken };
};

export const googleSignin = async (
  credentialResponse: CredentialResponse
): Promise<{ user: IUser; accessToken: string; refreshToken: string }> => {
  const response = await apiClient.post<AuthResponse>("/auth/googleSignIn", {
    credential: credentialResponse.credential,
  });

  const { accessToken, refreshToken, _id, username, email } = response.data;

  const user: IUser = { _id, email, username };

  localStorage.setItem("token", accessToken);
  localStorage.setItem("refreshToken", refreshToken);
  localStorage.setItem("user", JSON.stringify(user));

  return { user, accessToken, refreshToken };
};

export const getUserProfile = async (): Promise<IUser> => {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No token found");

    const response = await apiClient.get<IUser>("/user/profile", {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data;
  } catch (error) {
    console.error("Failed to fetch user profile:", error);
    throw new Error("Failed to load user profile.");
  }
};

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

// services/user-service.ts

// Fetch user profile by userId (sent via query param)
// export const fetchUserProfile = async (userId: string): Promise<IUser> => {
//   try {
//     const response = await apiClient.get<IUser>("/users/profile", {
//       params: { userId },
//     });
//     return response.data;
//   } catch (error) {
//     console.error(`Error fetching user profile for userId ${userId}:`, error);
//     throw new Error("Failed to fetch user profile");
//   }
// };

export const fetchUserProfile = async (userId: string): Promise<IUser> => {
  try {
    const response = await apiClient.get<IUser>("/user/getUserById", {
      params: { userId },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching user profile:", error);
    throw new Error("Failed to fetch user profile");
  }
};

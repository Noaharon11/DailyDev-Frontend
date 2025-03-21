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

// // Login with email and password
// export const loginUser = async (
//   email: string,
//   password: string
// ): Promise<AuthResponse> => {
//   try {
//     const response = await apiClient.post<AuthResponse>("/auth/login", {
//       email,
//       password,
//     });

//     if (!response.data || !response.data.user) {
//       throw new Error("Invalid response from server");
//     }

//     return response.data;
//   } catch (error) {
//     console.error("Login failed:", error);
//     throw new Error("Login failed. Please check your credentials.");
//   }
// };

// // Login with Google OAuth
// export const googleSignin = async (
//   credentialResponse: CredentialResponse
// ): Promise<AuthResponse> => {
//   if (!credentialResponse.credential) {
//     throw new Error("Google credential is missing");
//   }

//   console.log("Sending credential:", credentialResponse.credential);

//   try {
//     const response = await apiClient.post<AuthResponse>("/auth/googleSignIn", {
//       credential: credentialResponse.credential,
//     });

//     return response.data;
//   } catch (error) {
//     console.error("Google login failed:", error);
//     throw new Error("Google login failed. Please try again.");
//   }
// };

// // Fetch the logged-in user's profile (✅ תיקון הנתיב)
// export const getUserProfile = async (): Promise<IUser> => {
//   try {
//     const response = await apiClient.get<IUser>("/user/profile"); // ⚠️ שיניתי ל-`/user/profile`
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
//     const response = await apiClient.put<IUser>(`/users/${userId}`, updates);
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

import apiClient from "./api-client";
import { CredentialResponse } from "@react-oauth/google";
import { IUser, AuthResponse } from "../types/index";

// Register a new user
export const registerUser = async (userData: {
  username: string;
  email: string;
  password: string;
}): Promise<AuthResponse> => {
  try {
    const response = await apiClient.post<AuthResponse>(
      "/auth/register",
      userData
    );
    return response.data;
  } catch (error) {
    console.error("Registration failed:", error);
    throw new Error("Registration failed. Please try again.");
  }
};

// Login with email and password

export const loginUser = async (
  email: string,
  password: string
): Promise<AuthResponse> => {
  try {
    console.log("📤 Sending login request to server...");
    const response = await apiClient.post<AuthResponse>("/auth/login", {
      email,
      password,
    });

    console.log("✅ Server response:", response);

    // בודק שהתגובה מכילה נתונים
    if (!response.data || !response.data.accessToken) {
      console.error("❌ Invalid response from server:", response);
      throw new Error("Invalid response from server");
    }

    // שמירת הנתונים ב-localStorage
    localStorage.setItem("token", response.data.accessToken);
    localStorage.setItem("refreshToken", response.data.refreshToken);
    localStorage.setItem("user", JSON.stringify(response.data));

    console.log("✅ Data saved to localStorage:", {
      token: response.data.accessToken,
      refreshToken: response.data.refreshToken,
      user: response.data,
    });

    return response.data;
  } catch (error) {
    console.error("❌ Login request failed:", error);
    throw new Error("Invalid email or password.");
  }
};

// Login with Google OAuth
export const googleSignin = async (
  credentialResponse: CredentialResponse
): Promise<AuthResponse> => {
  if (!credentialResponse.credential) {
    throw new Error("Google credential is missing");
  }

  console.log("Sending credential:", credentialResponse.credential);

  try {
    const response = await apiClient.post<AuthResponse>("/auth/googleSignIn", {
      credential: credentialResponse.credential,
    });

    if (
      !response.data ||
      !response.data.accessToken ||
      !response.data.refreshToken
    ) {
      throw new Error("Invalid response from server");
    }

    // Ensure tokens are saved properly
    localStorage.setItem("token", response.data.accessToken);
    localStorage.setItem("refreshToken", response.data.refreshToken);
    localStorage.setItem("user", JSON.stringify(response.data.user));

    return response.data;
  } catch (error) {
    console.error("Google login failed:", error);
    throw new Error("Google login failed. Please try again.");
  }
};

// Fetch the logged-in user's profile
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

// Fetch any user profile by ID
export const fetchUserProfile = async (userId: string): Promise<IUser> => {
  try {
    const response = await apiClient.get<IUser>(`/users/${userId}`);
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch user profile for ID: ${userId}`, error);
    throw new Error("Failed to load user profile.");
  }
};

// Update user profile
export const updateUserProfile = async (
  userId: string,
  updates: Partial<IUser>
): Promise<IUser> => {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No token found");

    const response = await apiClient.put<IUser>(`/users/${userId}`, updates, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data;
  } catch (error) {
    console.error("Failed to update user profile:", error);
    throw new Error("Failed to update profile.");
  }
};

// Logout user (removes token and refresh token)
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

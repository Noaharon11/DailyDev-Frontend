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
    const response = await apiClient.post<AuthResponse>("/auth/login", {
      email,
      password,
    });

    if (!response.data || !response.data.user) {
      throw new Error("Invalid response from server");
    }

    return response.data;
  } catch (error) {
    console.error("Login failed:", error);
    throw new Error("Login failed. Please check your credentials.");
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

    return response.data;
  } catch (error) {
    console.error("Google login failed:", error);
    throw new Error("Google login failed. Please try again.");
  }
};

// Fetch the logged-in user's profile (✅ תיקון הנתיב)
export const getUserProfile = async (): Promise<IUser> => {
  try {
    const response = await apiClient.get<IUser>("/user/profile"); // ⚠️ שיניתי ל-`/user/profile`
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
    const response = await apiClient.put<IUser>(`/users/${userId}`, updates);
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

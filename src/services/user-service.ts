import apiClient from "./api-client";
import { CredentialResponse } from "@react-oauth/google";
import { IUser, AuthResponse } from "../types";

// Register new user
export const registerUser = async (
  userData: Partial<IUser>
): Promise<AuthResponse> => {
  const response = await apiClient.post<AuthResponse>(
    "/auth/register",
    userData
  );

  // Save tokens and user data
  const { user, accessToken, refreshToken } = response.data;
  localStorage.setItem("token", accessToken);
  localStorage.setItem("refreshToken", refreshToken);
  localStorage.setItem("user", JSON.stringify(user));

  return response.data;
};

// Login with email & password
export const loginUser = async (
  email: string,
  password: string
): Promise<AuthResponse> => {
  const response = await apiClient.post<AuthResponse>("/auth/login", {
    email,
    password,
  });

  // Save tokens and user data
  const { user, accessToken, refreshToken } = response.data;
  localStorage.setItem("token", accessToken);
  localStorage.setItem("refreshToken", refreshToken);
  localStorage.setItem("user", JSON.stringify(user));

  return response.data;
};

// Google Sign-In
export const googleSignin = async (
  credentialResponse: CredentialResponse
): Promise<AuthResponse> => {
  const response = await apiClient.post<AuthResponse>(
    "/auth/google-signin",
    credentialResponse
  );

  // Save tokens and user data
  const { user, accessToken, refreshToken } = response.data;
  localStorage.setItem("token", accessToken);
  localStorage.setItem("refreshToken", refreshToken);
  localStorage.setItem("user", JSON.stringify(user));

  return response.data;
};

// Get user profile
export const getUserProfile = async (userId: string): Promise<IUser> => {
  const response = await apiClient.get<IUser>(`/user/profile/${userId}`);
  return response.data;
};

// Update user profile
export const updateUserProfile = async (
  userId: string,
  updates: Partial<IUser>
): Promise<IUser> => {
  const response = await apiClient.put<IUser>(
    `/user/profile/${userId}`,
    updates
  );

  // If updating current user, update localStorage
  const currentUser = localStorage.getItem("user");
  if (currentUser) {
    const user = JSON.parse(currentUser);
    if (user._id === userId) {
      localStorage.setItem(
        "user",
        JSON.stringify({ ...user, ...response.data })
      );
    }
  }

  return response.data;
};

// Logout
export const logoutUser = async () => {
  try {
    await apiClient.post("/auth/logout");
  } catch (error) {
    console.error("Logout error:", error);
  } finally {
    // Clear local storage
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");

    // Redirect to login
    window.location.href = "/login";
  }
};

import apiClient from "./api-client";
import { CredentialResponse } from "@react-oauth/google";
import { IUser, AuthResponse } from "../types/index";

// ✅ Register a new user
export const registerUser = async (userData: {
  username: string;
  email: string;
  password: string;
}): Promise<AuthResponse> => {
  const response = await apiClient.post<AuthResponse>(
    "/auth/register",
    userData
  );
  return response.data;
};

// ✅ Login with email and password
export const loginUser = async (
  email: string,
  password: string
): Promise<AuthResponse> => {
  const response = await apiClient.post<AuthResponse>("/auth/login", {
    email,
    password,
  });
  return response.data;
};

// ✅ Login with Google OAuth
export const googleSignin = async (
  credentialResponse: CredentialResponse
): Promise<AuthResponse> => {
  if (!credentialResponse.credential) {
    throw new Error("Google credential is missing");
  }

  const response = await apiClient.post<AuthResponse>("/auth/googleSignIn", {
    credential: credentialResponse.credential,
  });

  return response.data;
};

// ✅ Fetch the logged-in user's profile
export const getUserProfile = async (): Promise<IUser> => {
  const response = await apiClient.get<IUser>("/users/profile");
  return response.data;
};

// ✅ Fetch any user profile by ID
export const fetchUserProfile = async (userId: string): Promise<IUser> => {
  const response = await apiClient.get<IUser>(`/users/${userId}`);
  return response.data;
};

// ✅ Update user profile
export const updateUserProfile = async (
  userId: string,
  updates: Partial<IUser>
): Promise<IUser> => {
  const response = await apiClient.put<IUser>(`/users/${userId}`, updates);
  return response.data;
};

// ✅ Logout user (removes token and refresh token)
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

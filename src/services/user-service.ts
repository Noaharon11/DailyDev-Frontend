import apiClient from "./api-client";
import { CredentialResponse } from "@react-oauth/google";
import {
  RegisterResponse,
  IUser,
  AuthResponse,
  GoogleAuthResponse,
} from "../types";

export const registerUser = async ({
  username,
  email,
  password,
  imageUrl,
}: {
  username: string;
  email: string;
  password: string;
  imageUrl?: string;
}): Promise<{ user: IUser; accessToken: string }> => {
  const response = await apiClient.post<RegisterResponse>("/auth/register", {
    username,
    email,
    password,
    imageUrl,
  });

  const { token, user } = response.data;

  localStorage.setItem("token", token);
  localStorage.setItem("user", JSON.stringify(user));

  return { user, accessToken: token };
};

export const loginUser = async (
  email: string,
  password: string
): Promise<{ user: IUser; accessToken: string; refreshToken: string }> => {
  const response = await apiClient.post<AuthResponse>("/auth/login", {
    email,
    password,
  });

  const { accessToken, refreshToken, _id } = response.data;

  // Save tokens
  localStorage.setItem("token", accessToken);
  localStorage.setItem("refreshToken", refreshToken);

  // Fetch full user profile
  const fullUser = await fetchUserProfile(_id);

  // Save full user in localStorage
  localStorage.setItem("user", JSON.stringify(fullUser));

  return { user: fullUser, accessToken, refreshToken };
};

export const googleSignin = async (
  credentialResponse: CredentialResponse
): Promise<{ user: IUser; accessToken: string; refreshToken: string }> => {
  const response = await apiClient.post<GoogleAuthResponse>(
    "/auth/googleSignIn",
    {
      credential: credentialResponse.credential,
    }
  );

  const {
    accessToken,
    refreshToken,
    _id,
    username,
    email,
    profilePicture = "",
    bio = "",
  } = response.data;

  const user: IUser = {
    _id,
    email,
    username,
    imageUrl: profilePicture,
    bio,
  };

  // Store in localStorage
  localStorage.setItem("user", JSON.stringify(user));
  localStorage.setItem("token", accessToken);
  localStorage.setItem("refreshToken", refreshToken);

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

export const updateUserProfile = async (data: {
  username: string;
  bio: string;
  imageUrl?: string;
}): Promise<IUser> => {
  try {
    const response = await apiClient.put<{ user: IUser }>(
      "/user/profile",
      data,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    console.log("Sending token:", `Bearer ${localStorage.getItem("token")}`);

    return response.data.user;
  } catch (error) {
    console.error("Error updating user profile:", error);
    throw error;
  }
};

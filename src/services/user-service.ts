import apiClient from "./api-client";
import { CredentialResponse } from "@react-oauth/google";

// Interface for User data
export interface IUser {
  username: string;
  email: string;
  password?: string;
  imgUrl?: string;
  _id?: string;
  accessToken?: string;
  refreshToken?: string;
}

// Register new user
// export const registerUser = async (user: IUser): Promise<IUser> => {
//   try {
//     const res = await apiClient.post<IUser>("/auth/register", user);
//     return res.data; // Returns registered user data
//   } catch (error) {
//     console.error("Registration error:", error);
//     throw error;
//   }
// };

export const registerUser = async (user: IUser) => {
  localStorage.setItem("mockUser", JSON.stringify(user));
  return Promise.resolve(user);
};

export const loginUser = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const storedUser = localStorage.getItem("mockUser");
  if (storedUser) {
    const parsedUser = JSON.parse(storedUser);
    if (parsedUser.email === email && parsedUser.password === password) {
      return Promise.resolve(parsedUser);
    } else {
      return Promise.reject("Email or password incorrect");
    }
  }
  return Promise.reject("User not found");
};

// Login existing user
// export const loginUser = async (user: {
//   email: string;
//   password: string;
// }): Promise<IUser> => {
//   try {
//     const res = await apiClient.post<IUser>("/auth/login", user);
//     return res.data; // Returns logged-in user data (tokens included)
//   } catch (error) {
//     console.error("Login error:", error);
//     throw error;
//   }
// };

// Google Sign-In functionality
export const googleSignin = async (
  credentialResponse: CredentialResponse
): Promise<IUser> => {
  try {
    const res = await apiClient.post<IUser>(
      "/auth/google-signin",
      credentialResponse
    );
    return res.data;
  } catch (error) {
    console.error("Google sign-in error:", error);
    throw error;
  }
};

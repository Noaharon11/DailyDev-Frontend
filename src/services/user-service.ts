import apiClient from "./api-client";
import { CredentialResponse } from "@react-oauth/google";
import { IUser } from "../types";

// function for saving user to local storage
const saveUserToLocalStorage = (user: IUser) => {
  localStorage.setItem("user", JSON.stringify(user));
};

// function for getting user from local storage
const getUserFromLocalStorage = (): IUser | null => {
  const storedUser = localStorage.getItem("user");
  return storedUser ? JSON.parse(storedUser) : null;
};

// function for registering user and saving to local storage
export const registerUser = async (user: IUser) => {
  saveUserToLocalStorage(user);
  return Promise.resolve(user);
};

// login user check if user exists in local storage
export const loginUser = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const storedUser = getUserFromLocalStorage();

  if (!storedUser) return Promise.reject("User not found");

  if (storedUser.email === email && storedUser.password === password) {
    return Promise.resolve(storedUser);
  } else {
    return Promise.reject("Email or password incorrect");
  }
};

// login user with google and save to local storage
export const googleSignin = async (
  credentialResponse: CredentialResponse
): Promise<IUser> => {
  try {
    const res = await apiClient.post<IUser>(
      "/auth/google-signin",
      credentialResponse
    );
    const googleUser = res.data;

    // create username from email
    if (!googleUser.username) {
      googleUser.username = googleUser.email.split("@")[0];
    }

    saveUserToLocalStorage(googleUser);
    return googleUser;
  } catch (error) {
    console.error("Google sign-in error:", error);
    throw error;
  }
};

// logout user by removing user from local storage
export const logoutUser = () => {
  localStorage.removeItem("user");
};

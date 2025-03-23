// src/utils/auth.ts
import { IUser } from "../types";

/**
 * Reads and parses the current user from localStorage.
 * Returns null if no user or invalid data.
 */
export const getCurrentUserFromStorage = (): IUser | null => {
  try {
    const userStr = localStorage.getItem("user");
    if (!userStr) return null;

    const user = JSON.parse(userStr);

    // Optional: validate required fields
    if (typeof user._id === "string" && typeof user.username === "string") {
      return user as IUser;
    }

    return null;
  } catch (err) {
    console.error("❌ Failed to parse user from localStorage:", err);
    return null;
  }
};
export const logout = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("token");
  localStorage.removeItem("refreshToken");
};

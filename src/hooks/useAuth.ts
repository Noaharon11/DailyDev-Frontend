import { useState, useEffect, useCallback } from "react";
import {
  loginUser,
  registerUser,
  logoutUser,
  googleSignin,
} from "../services/user-service";
import { IUser } from "../types/index";
import { CredentialResponse } from "@react-oauth/google";
import Alert from "../components/Alert";

export const useAuth = () => {
  const [user, setUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // ✅ טוען את המשתמש מ-localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  // ✅ התחברות רגילה
  const login = useCallback(async (email: string, password: string) => {
    setLoading(true);
    try {
      const loggedInUser = await loginUser(email, password);
      setUser(loggedInUser);
      localStorage.setItem("user", JSON.stringify(loggedInUser));
      setError(null);
      Alert("Logged in successfully!", "success");
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "Login failed";
      setError(errorMessage);
      setUser(null);
      Alert(errorMessage, "error");
    } finally {
      setLoading(false);
    }
  }, []);

  // ✅ הרשמה
  const register = useCallback(
    async (username: string, email: string, password: string) => {
      setLoading(true);
      try {
        const registeredUser = await registerUser({
          username,
          email,
          password,
        });
        setUser(registeredUser);
        localStorage.setItem("user", JSON.stringify(registeredUser));
        setError(null);
        Alert("Registered successfully!", "success");
      } catch (err: unknown) {
        const errorMessage =
          err instanceof Error ? err.message : "Registration failed";
        setError(errorMessage);
        setUser(null);
        Alert(errorMessage, "error");
      } finally {
        setLoading(false);
      }
    },
    []
  );

  // ✅ התנתקות
  const logout = useCallback(async () => {
    try {
      await logoutUser();
      setUser(null);
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      Alert("Logged out successfully!", "success");
    } catch {
      Alert("Logout failed!", "error");
    }
  }, []);

  // ✅ התחברות עם Google
  const googleLogin = useCallback(
    async (credentialResponse: CredentialResponse) => {
      setLoading(true);
      try {
        if (!credentialResponse.credential) {
          throw new Error(
            "Google authentication failed. No credential received."
          );
        }

        const googleUser = await googleSignin({
          credential: credentialResponse.credential,
        });

        setUser(googleUser);
        setError(null);
      } catch (err: unknown) {
        const errorMessage =
          err instanceof Error ? err.message : "Google login failed";
        setError(errorMessage);
        Alert(errorMessage, "error");
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return {
    user,
    loading,
    error,
    login,
    register,
    logout,
    googleLogin,
  };
};

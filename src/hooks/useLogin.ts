import { loginUser, googleSignin } from "../services/user-service";
import { CredentialResponse } from "@react-oauth/google";
import { IUser } from "../types/index";
import Alert from "../components/Alert";
import { useNavigate } from "react-router-dom";
import { useUser } from "../contexts/UserContext";
import { useState } from "react";

export const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error] = useState<string | null>(null);
  const navigate = useNavigate();
  const { setCurrentUser, setIsAuthenticated } = useUser();

  const login = async (
    email: string,
    password: string
  ): Promise<{ success: boolean; user?: IUser; error?: string }> => {
    try {
      setLoading(true);
      const { user } = await loginUser(email, password);
      Alert("Login successful!", "success");
      navigate("/dashboard");
      return { success: true, user };
    } catch {
      const errorMessage = "Login failed. Please check your credentials.";
      Alert(errorMessage, "error");
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  const loginWithGoogle = async (
    credentialResponse: CredentialResponse
  ): Promise<{ success: boolean; user?: IUser; error?: string }> => {
    try {
      setLoading(true);
      const { user } = await googleSignin(credentialResponse);
      setCurrentUser(user);
      setIsAuthenticated(true);

      Alert("Google login successful!", "success");
      navigate("/dashboard");
      return { success: true, user };
    } catch {
      const errorMessage = "Google login failed. Please try again.";
      Alert(errorMessage, "error");
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  return { login, loginWithGoogle, loading, error };
};

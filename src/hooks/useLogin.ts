import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { CredentialResponse } from "@react-oauth/google";
import { loginUser, googleSignin } from "../services/user-service";
import Alert from "../components/Alert";
import { AuthResponse } from "../types/index"; // Ensure correct import

export const useLogin = () => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const login = useCallback(
    async (email: string, password: string) => {
      setLoading(true);
      setError(null);

      try {
        const authResponse: AuthResponse = await loginUser(email, password);

        //  Extract user and tokens correctly
        const { user, accessToken, refreshToken } = authResponse;

        //  Save them in local storage
        localStorage.setItem("token", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        localStorage.setItem("user", JSON.stringify(user));

        navigate("/dashboard");
      } catch (err: unknown) {
        const errorMessage =
          err instanceof Error ? err.message : "Login failed";
        setError(errorMessage);
        Alert(errorMessage, "error");
      } finally {
        setLoading(false);
      }
    },
    [navigate]
  );

  const googleLogin = useCallback(
    async (credentialResponse: CredentialResponse) => {
      setLoading(true);
      setError(null);

      try {
        if (!credentialResponse.credential) {
          throw new Error(
            "Google authentication failed. No credential received."
          );
        }

        const authResponse: AuthResponse = await googleSignin(
          credentialResponse
        ); //  Get correct response

        //  Extract user and tokens correctly
        const { user, accessToken, refreshToken } = authResponse;

        //  Save them in local storage
        localStorage.setItem("token", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        localStorage.setItem("user", JSON.stringify(user));

        navigate("/dashboard");
      } catch (err: unknown) {
        const errorMessage =
          err instanceof Error ? err.message : "Google login failed";
        setError(errorMessage);
        Alert(errorMessage, "error");
      } finally {
        setLoading(false);
      }
    },
    [navigate]
  );

  return { login, googleLogin, error, loading };
};

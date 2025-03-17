import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { CredentialResponse } from "@react-oauth/google";
import { loginUser, googleSignin } from "../services/user-service";
import { IUser } from "../types";
import Alert from "../components/Alert";

export function useLogin() {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  // 📌 התחברות רגילה
  const handleLogin = async () => {
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    if (!email || !password) {
      Alert("Please enter both email and password.", "error");
      return;
    }

    try {
      const user: IUser = await loginUser({ email, password });
      localStorage.setItem("user", JSON.stringify(user));
      Alert(`Welcome, ${user.username}!`, "success");
      navigate("/dashboard");
    } catch (error) {
      Alert(error as string, "error");
    }
  };

  // 📌 התחברות עם Google – שימוש בטיפוס `CredentialResponse` במקום `any`
  const handleGoogleLoginSuccess = async (
    credentialResponse: CredentialResponse
  ) => {
    try {
      const user: IUser = await googleSignin(credentialResponse);
      localStorage.setItem("user", JSON.stringify(user));
      Alert(`Welcome, ${user.username}!`, "success");
      navigate("/dashboard");
    } catch {
      Alert("Google login failed.", "error");
    }
  };

  return { emailRef, passwordRef, handleLogin, handleGoogleLoginSuccess };
}

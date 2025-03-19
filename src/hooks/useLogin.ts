import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser, googleSignin } from "../services/user-service";
import Alert from "../components/Alert";
import { CredentialResponse } from "@react-oauth/google";

export function useLogin() {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  // ✅ Login with Email & Password
  const handleLogin = async () => {
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    if (!email || !password) {
      Alert("Please fill out all fields.", "error");
      return;
    }

    try {
      const user = await loginUser(email, password); // ✅ קריאה לשרת
      localStorage.setItem("user", JSON.stringify(user)); // ✅ שמירת משתמש מחובר
      Alert("Login successful!", "success");
      navigate("/dashboard");
    } catch {
      Alert("Invalid email or password.", "error");
    }
  };

  // ✅ Google Login
  const handleGoogleLoginSuccess = async (
    credentialResponse: CredentialResponse
  ) => {
    try {
      const user = await googleSignin(credentialResponse); // ✅ קריאה לשרת
      localStorage.setItem("user", JSON.stringify(user)); // ✅ שמירת משתמש מחובר
      Alert("Google Login successful!", "success");
      navigate("/dashboard");
    } catch {
      Alert("Google login failed.", "error");
    }
  };

  return {
    emailRef,
    passwordRef,
    handleLogin,
    handleGoogleLoginSuccess,
  };
}

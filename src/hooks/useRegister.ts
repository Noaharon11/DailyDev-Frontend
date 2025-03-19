import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser, googleSignin } from "../services/user-service";
import Alert from "../components/Alert";
import { CredentialResponse } from "@react-oauth/google";

export function useRegister() {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  const [imgSrc, setImgSrc] = useState<File | null>(null);
  const navigate = useNavigate();

  // ✅ Upload image handler
  const handleImgChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImgSrc(e.target.files[0]);
    }
  };

  // ✅ Regular Registration Function
  const register = async () => {
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;
    const confirmPassword = confirmPasswordRef.current?.value;

    if (!email || !password || !confirmPassword) {
      Alert("Please fill out all fields.", "error");
      return;
    }

    if (password !== confirmPassword) {
      Alert("Passwords do not match.", "error");
      return;
    }

    const username = email.split("@")[0]; // ✅ Create username from email

    try {
      const newUser = await registerUser({ username, email, password });
      localStorage.setItem("user", JSON.stringify(newUser)); // ✅ Save user in local storage
      Alert("Registration successful!", "success");
      navigate("/dashboard");
    } catch {
      Alert("Registration failed.", "error");
    }
  };

  // ✅ Google Registration/Login Function
  const handleGoogleLoginSuccess = async (
    credentialResponse: CredentialResponse
  ) => {
    try {
      const user = await googleSignin(credentialResponse);
      localStorage.setItem("user", JSON.stringify(user)); // ✅ Save authenticated user
      Alert("Google Registration successful!", "success");
      navigate("/dashboard");
    } catch {
      Alert("Google registration failed.", "error");
    }
  };

  return {
    emailRef,
    passwordRef,
    confirmPasswordRef,
    imgSrc,
    handleImgChange,
    register,
    handleGoogleLoginSuccess,
  };
}

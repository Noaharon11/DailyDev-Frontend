import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/user-service";
import { IUser } from "../types";
import Alert from "../components/Alert";

export function useRegister() {
  const [imgSrc, setImgSrc] = useState<File | null>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const handleImgChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImgSrc(e.target.files[0]);
    }
  };

  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const register = async () => {
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;
    const confirmPassword = confirmPasswordRef.current?.value;

    if (!email || !password || !confirmPassword) {
      Alert("Please fill out all fields.", "error");
      return;
    }

    if (!isValidEmail(email)) {
      Alert("Invalid email address.", "error");
      return;
    }

    if (password !== confirmPassword) {
      Alert("Passwords do not match.", "error");
      return;
    }

    const username = email.split("@")[0]; // יצירת שם משתמש אוטומטית
    const user: IUser = { username, email, password };

    try {
      await registerUser(user);
      localStorage.setItem("user", JSON.stringify(user)); // שמירת המשתמש ב-localStorage
      Alert("Registration successful!", "success");
      navigate("/dashboard");
    } catch {
      Alert("Registration failed.", "error");
    }
  };

  return {
    emailRef,
    passwordRef,
    confirmPasswordRef,
    imgSrc,
    handleImgChange,
    register,
  };
}

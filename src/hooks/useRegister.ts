import { useState, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser, googleSignin } from "../services/user-service";
import { uploadFile } from "../services/file-service";
import Alert from "../components/Alert";
import { CredentialResponse } from "@react-oauth/google";

// 📌 פונקציה לבדיקת תקינות מייל
const isValidEmail = (email: string): boolean => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

// 📌 פונקציה לבדיקת חוזק הסיסמה
const isStrongPassword = (password: string): boolean => {
  return password.length >= 6;
};

export function useRegister() {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  const [imgSrc, setImgSrc] = useState<File | null>(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // 📌 עדכון תמונת פרופיל
  const handleImgChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImgSrc(e.target.files[0]);
    }
  };

  // 📌 הרשמה רגילה
  const register = useCallback(async () => {
    setLoading(true);
    try {
      const email = emailRef.current?.value?.trim();
      const password = passwordRef.current?.value?.trim();
      const confirmPassword = confirmPasswordRef.current?.value?.trim();

      // 📌 בדיקת קלט תקין
      if (!email || !password || !confirmPassword) {
        Alert("Please fill out all fields.", "error");
        return;
      }
      if (!isValidEmail(email)) {
        Alert("Invalid email format.", "error");
        return;
      }
      if (!isStrongPassword(password)) {
        Alert("Password must be at least 6 characters.", "error");
        return;
      }
      if (password !== confirmPassword) {
        Alert("Passwords do not match.", "error");
        return;
      }

      const username = email.split("@")[0];

      // 📌 שליחת בקשה לרישום
      let newUser = await registerUser({ username, email, password });

      // 📌 אם יש תמונה, נעלה אותה לשרת
      if (imgSrc) {
        try {
          const imageUrl = await uploadFile(imgSrc);
          newUser = { ...newUser, imageUrl };
        } catch (error) {
          console.error("❌ Avatar upload error:", error);
          Alert(
            "Registered successfully, but avatar upload failed.",
            "warning"
          );
        }
      }

      // 📌 שמירת המשתמש בלוקאל סטורג'
      localStorage.setItem("user", JSON.stringify(newUser));
      Alert("Registration successful!", "success");
      navigate("/dashboard");
    } catch (error: unknown) {
      console.error("❌ Registration error:", error);
      Alert("Registration failed. Please try again.", "error");
    } finally {
      setLoading(false);
    }
  }, [imgSrc, navigate]);

  // 📌 התחברות עם Google
  const handleGoogleLoginSuccess = useCallback(
    async (credentialResponse: CredentialResponse) => {
      setLoading(true);
      try {
        if (!credentialResponse.credential) {
          throw new Error(
            "Google authentication failed. No credential received."
          );
        }

        const user = await googleSignin({
          credential: credentialResponse.credential,
        });

        localStorage.setItem("user", JSON.stringify(user));
        Alert("Google Registration successful!", "success");
        navigate("/dashboard");
      } catch (error: unknown) {
        console.error("❌ Google registration error:", error);
        Alert("Google registration failed. Please try again.", "error");
      } finally {
        setLoading(false);
      }
    },
    [navigate]
  );

  return {
    emailRef,
    passwordRef,
    confirmPasswordRef,
    imgSrc,
    handleImgChange,
    register,
    handleGoogleLoginSuccess,
    loading,
  };
}

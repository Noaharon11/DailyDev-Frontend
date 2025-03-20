import { useState, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser, googleSignin } from "../services/user-service";
import { uploadFile } from "../services/file-service";
import Alert from "../components/Alert";
import { CredentialResponse } from "@react-oauth/google";
import { AuthResponse } from "../types/index"; // Ensure correct import

// ✅ Validate email format
const isValidEmail = (email: string): boolean => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

// ✅ Validate password strength
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

  // ✅ Handle profile image selection
  const handleImgChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImgSrc(e.target.files[0]);
    }
  };

  // ✅ Register with email and password
  const register = useCallback(async () => {
    setLoading(true);
    try {
      const email = emailRef.current?.value?.trim();
      const password = passwordRef.current?.value?.trim();
      const confirmPassword = confirmPasswordRef.current?.value?.trim();

      // ✅ Validate input fields
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

      // ✅ Send registration request and ensure correct type
      const authResponse: AuthResponse = await registerUser({
        username,
        email,
        password,
      });

      // ✅ Upload profile image if provided
      let user = authResponse.user; // Ensure we're using the correct user object
      if (imgSrc) {
        try {
          const imageUrl = await uploadFile(imgSrc);
          user = { ...user, imageUrl }; // Update user with the image URL
        } catch (error) {
          console.error("❌ Avatar upload error:", error);
          Alert(
            "Registered successfully, but avatar upload failed.",
            "warning"
          );
        }
      }

      // ✅ Store user and tokens in local storage
      localStorage.setItem("token", authResponse.accessToken);
      localStorage.setItem("refreshToken", authResponse.refreshToken);
      localStorage.setItem("user", JSON.stringify(user));

      Alert("Registration successful!", "success");
      navigate("/dashboard");
    } catch (error: unknown) {
      console.error("❌ Registration error:", error);
      Alert("Registration failed. Please try again.", "error");
    } finally {
      setLoading(false);
    }
  }, [imgSrc, navigate]);

  // ✅ Handle Google authentication
  const handleGoogleLoginSuccess = useCallback(
    async (credentialResponse: CredentialResponse) => {
      setLoading(true);
      try {
        if (!credentialResponse.credential) {
          throw new Error(
            "Google authentication failed. No credential received."
          );
        }

        const authResponse: AuthResponse = await googleSignin(
          credentialResponse
        );

        // ✅ Store user and tokens in local storage
        localStorage.setItem("token", authResponse.accessToken);
        localStorage.setItem("refreshToken", authResponse.refreshToken);
        localStorage.setItem("user", JSON.stringify(authResponse.user));

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

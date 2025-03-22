// import { useState, useEffect, useCallback } from "react";
// import {
//   loginUser,
//   registerUser,
//   logoutUser,
//   googleSignin,
// } from "../services/user-service";
// import { AuthResponse, IUser } from "../types/index";
// import { CredentialResponse } from "@react-oauth/google";
// import Alert from "../components/Alert";

// export const useAuth = () => {
//   const [user, setUser] = useState<IUser | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   // ✅ Load user from localStorage on mount
//   useEffect(() => {
//     const storedUser = localStorage.getItem("user");
//     if (storedUser) {
//       setUser(JSON.parse(storedUser));
//     }
//     setLoading(false);
//   }, []);

//   // ✅ Handle login with email and password
//   const login = useCallback(async (email: string, password: string) => {
//     setLoading(true);
//     try {
//       const authResponse: AuthResponse = await loginUser(email, password);

//       // ✅ Extract user and tokens correctly
//       const { user, accessToken, refreshToken } = authResponse;
//       setUser(user);

//       // ✅ Store user and tokens in localStorage
//       localStorage.setItem("token", accessToken);
//       localStorage.setItem("refreshToken", refreshToken);
//       localStorage.setItem("user", JSON.stringify(user));

//       setError(null);
//       Alert("Logged in successfully!", "success");
//     } catch (err: unknown) {
//       const errorMessage = err instanceof Error ? err.message : "Login failed";
//       setError(errorMessage);
//       setUser(null);
//       Alert(errorMessage, "error");
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   // ✅ Handle user registration
//   const register = useCallback(
//     async (username: string, email: string, password: string) => {
//       setLoading(true);
//       try {
//         const authResponse: AuthResponse = await registerUser({
//           username,
//           email,
//           password,
//         });

//         // ✅ Extract user and tokens correctly
//         const { user, accessToken, refreshToken } = authResponse;
//         setUser(user);

//         // ✅ Store user and tokens in localStorage
//         localStorage.setItem("token", accessToken);
//         localStorage.setItem("refreshToken", refreshToken);
//         localStorage.setItem("user", JSON.stringify(user));

//         setError(null);
//         Alert("Registered successfully!", "success");
//       } catch (err: unknown) {
//         const errorMessage =
//           err instanceof Error ? err.message : "Registration failed";
//         setError(errorMessage);
//         setUser(null);
//         Alert(errorMessage, "error");
//       } finally {
//         setLoading(false);
//       }
//     },
//     []
//   );

//   // ✅ Handle user logout
//   const logout = useCallback(async () => {
//     try {
//       await logoutUser();
//       setUser(null);

//       // ✅ Clear all localStorage data
//       localStorage.removeItem("user");
//       localStorage.removeItem("token");
//       localStorage.removeItem("refreshToken");

//       Alert("Logged out successfully!", "success");
//     } catch {
//       Alert("Logout failed!", "error");
//     }
//   }, []);

//   // ✅ Handle Google login
//   const googleLogin = useCallback(
//     async (credentialResponse: CredentialResponse) => {
//       setLoading(true);
//       try {
//         if (!credentialResponse.credential) {
//           throw new Error(
//             "Google authentication failed. No credential received."
//           );
//         }

//         const authResponse: AuthResponse = await googleSignin(
//           credentialResponse
//         );

//         // ✅ Extract user and tokens correctly
//         const { user, accessToken, refreshToken } = authResponse;
//         setUser(user);

//         // ✅ Store user and tokens in localStorage
//         localStorage.setItem("token", accessToken);
//         localStorage.setItem("refreshToken", refreshToken);
//         localStorage.setItem("user", JSON.stringify(user));

//         setError(null);
//         Alert("Google login successful!", "success");
//       } catch (err: unknown) {
//         const errorMessage =
//           err instanceof Error ? err.message : "Google login failed";
//         setError(errorMessage);
//         Alert(errorMessage, "error");
//       } finally {
//         setLoading(false);
//       }
//     },
//     []
//   );

//   return {
//     user,
//     loading,
//     error,
//     login,
//     register,
//     logout,
//     googleLogin,
//   };
// };

// hooks/useAuth.ts
import { useEffect } from "react";
import { IUser } from "../types";

export const useAuth = (setUser: (user: IUser) => void) => {
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, [setUser]);
};

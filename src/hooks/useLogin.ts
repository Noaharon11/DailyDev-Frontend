// // // // // import { useState, useCallback } from "react";
// // // // // import { useNavigate } from "react-router-dom";
// // // // // import { CredentialResponse } from "@react-oauth/google";
// // // // // import { loginUser, googleSignin } from "../services/user-service";
// // // // // import Alert from "../components/Alert";
// // // // // import { AuthResponse } from "../types/index"; // Ensure correct import

// // // // // export const useLogin = () => {
// // // // //   const [error, setError] = useState<string | null>(null);
// // // // //   const [loading, setLoading] = useState(false);
// // // // //   const navigate = useNavigate();

// // // // //   // const login = useCallback(
// // // // //   //   async (email: string, password: string) => {
// // // // //   //     setLoading(true);
// // // // //   //     setError(null);

// // // // //   //     try {
// // // // //   //       const authResponse: AuthResponse = await loginUser(email, password);
// // // // //   //       console.log("🔍 Login response:", authResponse);

// // // // //   //       //  Extract user and tokens correctly
// // // // //   //       const { user, accessToken, refreshToken } = authResponse;

// // // // //   //       //  Save them in local storage
// // // // //   //       localStorage.setItem("token", accessToken);
// // // // //   //       localStorage.setItem("refreshToken", refreshToken);
// // // // //   //       localStorage.setItem("user", JSON.stringify(user));

// // // // //   //       navigate("/dashboard");
// // // // //   //     } catch (err: unknown) {
// // // // //   //       const errorMessage =
// // // // //   //         err instanceof Error ? err.message : "Login failed";
// // // // //   //       setError(errorMessage);
// // // // //   //       Alert(errorMessage, "error");
// // // // //   //     } finally {
// // // // //   //       setLoading(false);
// // // // //   //     }
// // // // //   //   },
// // // // //   //   [navigate]
// // // // //   // );

// // // // //   const login = useCallback(
// // // // //     async (email: string, password: string) => {
// // // // //       setLoading(true);
// // // // //       setError(null);

// // // // //       try {
// // // // //         const authResponse: AuthResponse = await loginUser(email, password);
// // // // //         console.log("🔍 Login response in useLogin:", authResponse);

// // // // //         if (!authResponse || !authResponse.accessToken) {
// // // // //           throw new Error("❌ No accessToken received!");
// // // // //         }

// // // // //         const { user, accessToken, refreshToken } = authResponse;
// // // // //         console.log("✅ Data received:", { user, accessToken, refreshToken });

// // // // //         localStorage.setItem("token", accessToken);
// // // // //         localStorage.setItem("refreshToken", refreshToken);
// // // // //         localStorage.setItem("user", JSON.stringify(user));

// // // // //         navigate("/dashboard");
// // // // //       } catch (err) {
// // // // //         console.error("❌ Login error:", err);
// // // // //         Alert("Login failed!", "error");
// // // // //       } finally {
// // // // //         setLoading(false);
// // // // //       }
// // // // //     },
// // // // //     [navigate]
// // // // //   );

// // // // //   const googleLogin = useCallback(
// // // // //     async (credentialResponse: CredentialResponse) => {
// // // // //       setLoading(true);
// // // // //       setError(null);

// // // // //       try {
// // // // //         if (!credentialResponse.credential) {
// // // // //           throw new Error(
// // // // //             "Google authentication failed. No credential received."
// // // // //           );
// // // // //         }

// // // // //         const authResponse: AuthResponse = await googleSignin(
// // // // //           credentialResponse
// // // // //         ); //  Get correct response

// // // // //         //  Extract user and tokens correctly
// // // // //         const { user, accessToken, refreshToken } = authResponse;

// // // // //         //  Save them in local storage
// // // // //         localStorage.setItem("token", accessToken);
// // // // //         localStorage.setItem("refreshToken", refreshToken);
// // // // //         localStorage.setItem("user", JSON.stringify(user));

// // // // //         navigate("/dashboard");
// // // // //       } catch (err: unknown) {
// // // // //         const errorMessage =
// // // // //           err instanceof Error ? err.message : "Google login failed";
// // // // //         setError(errorMessage);
// // // // //         Alert(errorMessage, "error");
// // // // //       } finally {
// // // // //         setLoading(false);
// // // // //       }
// // // // //     },
// // // // //     [navigate]
// // // // //   );

// // // // //   return { login, googleLogin, error, loading };
// // // // // };

// // // // import { useState, useCallback } from "react";
// // // // import { useNavigate } from "react-router-dom";
// // // // import { CredentialResponse } from "@react-oauth/google";
// // // // import { loginUser, googleSignin } from "../services/user-service";
// // // // import Alert from "../components/Alert";
// // // // import { AuthResponse } from "../types/index"; // Ensure correct import

// // // // export const useLogin = () => {
// // // //   const [error, setError] = useState<string | null>(null);
// // // //   const [loading, setLoading] = useState(false);
// // // //   const navigate = useNavigate();

// // // //   const login = useCallback(
// // // //     async (email: string, password: string) => {
// // // //       setLoading(true);
// // // //       setError(null);

// // // //       try {
// // // //         console.log("🔍 Attempting login for:", email);
// // // //         const authResponse: AuthResponse = await loginUser(email, password);
// // // //         console.log("✅ Login response:", authResponse);

// // // //         if (!authResponse || !authResponse.accessToken) {
// // // //           throw new Error("❌ No accessToken received!");
// // // //         }

// // // //         const { user, accessToken, refreshToken } = authResponse;
// // // //         console.log("✅ Data received:", { user, accessToken, refreshToken });

// // // //         // 🔥 שמירת הנתונים ב־localStorage
// // // //         localStorage.setItem("token", accessToken);
// // // //         localStorage.setItem("refreshToken", refreshToken);
// // // //         localStorage.setItem("user", JSON.stringify(user));

// // // //         Alert("Login successful!", "success");
// // // //         navigate("/dashboard");
// // // //       } catch (err) {
// // // //         console.error("❌ Login error:", err);
// // // //         setError("Login failed. Please check your credentials.");
// // // //         Alert("Login failed!", "error");
// // // //       } finally {
// // // //         setLoading(false);
// // // //       }
// // // //     },
// // // //     [navigate]
// // // //   );

// // // //   const googleLogin = useCallback(
// // // //     async (credentialResponse: CredentialResponse) => {
// // // //       setLoading(true);
// // // //       setError(null);

// // // //       try {
// // // //         if (!credentialResponse.credential) {
// // // //           throw new Error(
// // // //             "❌ Google authentication failed. No credential received."
// // // //           );
// // // //         }

// // // //         console.log(
// // // //           "🔍 Sending Google credential:",
// // // //           credentialResponse.credential
// // // //         );
// // // //         const authResponse: AuthResponse = await googleSignin(
// // // //           credentialResponse
// // // //         );
// // // //         console.log("✅ Google login response:", authResponse);

// // // //         if (!authResponse || !authResponse.accessToken) {
// // // //           throw new Error("❌ No accessToken received!");
// // // //         }

// // // //         const { user, accessToken, refreshToken } = authResponse;
// // // //         console.log("✅ Data received:", { user, accessToken, refreshToken });

// // // //         // 🔥 שמירת הנתונים ב־localStorage
// // // //         localStorage.setItem("token", accessToken);
// // // //         localStorage.setItem("refreshToken", refreshToken);
// // // //         localStorage.setItem("user", JSON.stringify(user));

// // // //         Alert("Google login successful!", "success");
// // // //         navigate("/dashboard");
// // // //       } catch (err) {
// // // //         console.error("❌ Google login error:", err);
// // // //         setError("Google login failed.");
// // // //         Alert("Google login failed!", "error");
// // // //       } finally {
// // // //         setLoading(false);
// // // //       }
// // // //     },
// // // //     [navigate]
// // // //   );

// // // //   return { login, googleLogin, error, loading };
// // // // };

// // // import { useState, useCallback } from "react";
// // // import { useNavigate } from "react-router-dom";
// // // import { CredentialResponse } from "@react-oauth/google";
// // // import { loginUser, googleSignin } from "../services/user-service";
// // // import Alert from "../components/Alert";
// // // import { AuthResponse } from "../types/index"; // Ensure correct import

// // // export const useLogin = () => {
// // //   const [error, setError] = useState<string | null>(null);
// // //   const [loading, setLoading] = useState(false);
// // //   const navigate = useNavigate();

// // //   const saveTokensToLocalStorage = (authResponse: AuthResponse) => {
// // //     if (!authResponse || !authResponse.accessToken) {
// // //       console.error("❌ No accessToken received!");
// // //       return;
// // //     }

// // //     const { user, accessToken, refreshToken } = authResponse;
// // //     console.log("✅ Storing in localStorage:", {
// // //       user,
// // //       accessToken,
// // //       refreshToken,
// // //     });

// // //     localStorage.setItem("token", accessToken);
// // //     localStorage.setItem("refreshToken", refreshToken);
// // //     localStorage.setItem("user", JSON.stringify(user));
// // //   };

// // //   const login = async (email: string, password: string) => {
// // //     setLoading(true);
// // //     setError(null);

// // //     try {
// // //       // ביצוע בקשת ההתחברות
// // //       const response = await loginUser(email, password);

// // //       if (!response || !response.accessToken) {
// // //         throw new Error("Invalid response from server");
// // //       }

// // //       // שמירת נתוני המשתמש ב-localStorage
// // //       setUser(response);
// // //       localStorage.setItem("user", JSON.stringify(response));
// // //       localStorage.setItem("token", response.accessToken);
// // //       localStorage.setItem("refreshToken", response.refreshToken);

// // //       console.log("✅ Login successful:", response);
// // //       return { success: true };
// // //     } catch (err) {
// // //       const errorMessage = "Email or password is incorrect. Please try again.";
// // //       setError(errorMessage);
// // //       console.error("❌ Login failed:", err);
// // //       return { success: false, error: errorMessage };
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   // const login = async (email: string, password: string) => {
// // //   //   setLoading(true);
// // //   //   setError(null);
// // //   //   try {
// // //   //     const { request } = loginUser(email, password);
// // //   //     const response = await request;
// // //   //     setUser(response.data);
// // //   //     localStorage.setItem('user', JSON.stringify(response.data));
// // //   //     return { success: true };
// // //   //   } catch (err) {
// // //   //     const errorMessage = "Email or password is incorrect. Please try again.";
// // //   //     setError(errorMessage);
// // //   //     console.error(err);
// // //   //     return { success: false, error: errorMessage };
// // //   //   } finally {
// // //   //     setLoading(false);
// // //   //   }
// // //   // };

// // //   const googleLogin = useCallback(
// // //     async (credentialResponse: CredentialResponse) => {
// // //       setLoading(true);
// // //       setError(null);

// // //       try {
// // //         if (!credentialResponse.credential) {
// // //           throw new Error(
// // //             "❌ Google authentication failed. No credential received."
// // //           );
// // //         }

// // //         console.log(
// // //           "🔍 Sending Google credential:",
// // //           credentialResponse.credential
// // //         );
// // //         const authResponse: AuthResponse = await googleSignin(
// // //           credentialResponse
// // //         );
// // //         console.log("✅ Google login response:", authResponse);

// // //         saveTokensToLocalStorage(authResponse);
// // //         Alert("Google login successful!", "success");
// // //         navigate("/dashboard");
// // //       } catch (err) {
// // //         console.error("❌ Google login error:", err);
// // //         setError("Google login failed.");
// // //         Alert("Google login failed!", "error");
// // //       } finally {
// // //         setLoading(false);
// // //       }
// // //     },
// // //     [navigate]
// // //   );

// // //   return { login, googleLogin, error, loading };
// // // };

// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { loginUser, googleSignin } from "../services/user-service";
// import { AuthResponse } from "../types/index";
// //import Alert from "../components/Alert";

// export const useLogin = () => {
//   const [error, setError] = useState<string | null>(null);
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const login = async (email: string, password: string) => {
//     setLoading(true);
//     setError(null);

//     try {
//       const authResponse: AuthResponse = await loginUser(email, password);
//       if (!authResponse || !authResponse.accessToken) {
//         throw new Error("❌ Invalid response from server");
//       }

//       localStorage.setItem("token", authResponse.accessToken);
//       localStorage.setItem("refreshToken", authResponse.refreshToken);
//       localStorage.setItem("user", JSON.stringify(authResponse));
//       navigate("/dashboard");

//       return { success: true };
//     } catch {
//       setError("❌ Email or password is incorrect.");
//       return { success: false, error: "Email or password is incorrect." };
//     } finally {
//       setLoading(false);
//     }
//   };

//   const loginWithGoogle = async (credential: string) => {
//     setLoading(true);
//     setError(null);

//     try {
//       const authResponse = await googleSignin({ credential });
//       if (!authResponse || !authResponse.accessToken) {
//         throw new Error("❌ Invalid response from server");
//       }

//       localStorage.setItem("token", authResponse.accessToken);
//       localStorage.setItem("refreshToken", authResponse.refreshToken);
//       localStorage.setItem("user", JSON.stringify(authResponse.user));
//       navigate("/dashboard");

//       return { success: true };
//     } catch {
//       setError("Google login failed. Please try again.");
//       return { success: false, error: "Google login failed" };
//     } finally {
//       setLoading(false);
//     }
//   };

//   return { login, loginWithGoogle, error, loading };
// };

// hooks/useLogin.ts
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser, googleSignin } from "../services/user-service";
import { CredentialResponse } from "@react-oauth/google";
import { IUser } from "../types/index";
import Alert from "../components/Alert";

export const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error] = useState<string | null>(null);
  const navigate = useNavigate();

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

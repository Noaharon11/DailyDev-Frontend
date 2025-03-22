// import { useRef } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { GoogleLogin, CredentialResponse } from "@react-oauth/google";
// import { loginUser, googleSignin } from "../services/user-service";
// import Alert from "../components/Alert";
// import { IUser } from "../types/index";
// import "./Login.css";

// function Login({ setUser }: { setUser: (user: IUser) => void }) {
//   const emailRef = useRef<HTMLInputElement>(null);
//   const passwordRef = useRef<HTMLInputElement>(null);
//   const navigate = useNavigate();

//   // ✅ Login with email + password
//   const handleLogin = async () => {
//     const email = emailRef.current?.value?.trim();
//     const password = passwordRef.current?.value?.trim();

//     if (!email || !password) {
//       Alert("Please fill out all fields.", "error");
//       return;
//     }

//     try {
//       console.log("🔍 Trying to login with:", email, password);
//       const authResponse = await loginUser(email, password);

//       const user: IUser = {
//         _id: authResponse._id,
//         email: authResponse.email,
//         username: authResponse.username,
//       };

//       localStorage.setItem("token", authResponse.accessToken);
//       localStorage.setItem("refreshToken", authResponse.refreshToken);
//       localStorage.setItem("user", JSON.stringify(user));

//       setUser(user);
//       Alert("Login successful!", "success");
//       navigate("/dashboard");
//     } catch (error) {
//       const errorMessage =
//         error instanceof Error ? error.message : "An unknown error occurred.";
//       console.error("❌ Login error:", errorMessage);
//       Alert(errorMessage, "error");
//     }
//   };

//   // ✅ Login with Google
//   const handleGoogleLoginSuccess = async (
//     credentialResponse: CredentialResponse
//   ) => {
//     try {
//       const credential = credentialResponse.credential;
//       if (!credential) throw new Error("Google credential is missing.");

//       const authResponse = await googleSignin({ credential });

//       const user: IUser = {
//         _id: authResponse._id,
//         email: authResponse.email,
//         username: authResponse.username,
//       };

//       localStorage.setItem("token", authResponse.accessToken);
//       localStorage.setItem("refreshToken", authResponse.refreshToken);
//       localStorage.setItem("user", JSON.stringify(user));

//       setUser(user);
//       Alert("Google Login successful!", "success");
//       navigate("/dashboard");
//     } catch (error) {
//       const errorMessage =
//         error instanceof Error ? error.message : "An unknown error occurred.";
//       console.error("❌ Google login failed:", errorMessage);
//       Alert(errorMessage, "error");
//     }
//   };

//   return (
//     <div className="auth-container">
//       <div className="auth-box">
//         <h2>Sign in</h2>
//         <div className="auth-inputs">
//           <input
//             ref={emailRef}
//             type="email"
//             placeholder="Your email"
//             className="auth-input"
//           />
//           <input
//             ref={passwordRef}
//             type="password"
//             placeholder="Password"
//             className="auth-input"
//           />
//         </div>
//         <button className="auth-btn" onClick={handleLogin}>
//           Continue
//         </button>
//         <div className="auth-divider">OR</div>
//         <GoogleLogin
//           onSuccess={handleGoogleLoginSuccess}
//           onError={() => Alert("Google login error.", "error")}
//         />
//         <p className="auth-footer">
//           Don’t have an account? <Link to="/register">Sign up</Link>
//         </p>
//       </div>
//     </div>
//   );
// }

// export default Login;

import { useRef } from "react";
import { Link } from "react-router-dom";
import { GoogleLogin, CredentialResponse } from "@react-oauth/google";
import { useLogin } from "../hooks/useLogin";
import { IUser } from "../types";
import "./Login.css";
import { error } from "console";

function Login({ setUser }: { setUser: (user: IUser) => void }) {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const { login, loginWithGoogle } = useLogin();

  const handleLogin = async () => {
    const email = emailRef.current?.value?.trim();
    const password = passwordRef.current?.value?.trim();

    if (!email || !password) {
      alert("Please fill all fields.");
      return;
    }

    const result = await login(email, password);
    if (result.success && result.user) {
      setUser(result.user);
    }
  };

  // const handleGoogleLoginSuccess = async (
  //   credentialResponse: CredentialResponse
  // ) => {
  //   const result = await loginWithGoogle(credentialResponse);
  //   if (result.success && result.user) {
  //     setUser(result.user);
  //   }
  // };

  const handleGoogleLoginSuccess = async (
    credentialResponse: CredentialResponse
  ) => {
    console.log("🔐 Google credential response:", credentialResponse);

    if (!credentialResponse.credential) {
      alert("Missing Google credential.");
      return;
    }

    const result = await loginWithGoogle(credentialResponse);
    if (result.success && result.user) {
      setUser(result.user);
    } else {
      alert("Google login failed.");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Sign in</h2>
        <div className="auth-inputs">
          <input
            ref={emailRef}
            type="email"
            placeholder="Your email"
            className="auth-input"
          />
          <input
            ref={passwordRef}
            type="password"
            placeholder="Password"
            className="auth-input"
          />
        </div>
        <button className="auth-btn" onClick={handleLogin}>
          Continue
        </button>
        <div className="auth-divider">OR</div>
        <GoogleLogin
          onSuccess={handleGoogleLoginSuccess}
          onError={() => alert("Google login failed.")}
        />
        <p className="auth-footer">
          Don’t have an account? <Link to="/register">Sign up</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;

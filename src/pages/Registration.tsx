// import { useState } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import { registerUser, googleSignin } from "../services/user-service";
// import { GoogleLogin, CredentialResponse } from "@react-oauth/google";
// import Alert from "../components/Alert";
// import "./Registration.css";

// function Register() {
//   const [email, setEmail] = useState("");
//   const [username, setUsername] = useState(""); // adding username state
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const navigate = useNavigate();

//   // validate email function
//   const validateEmail = (email: string) => {
//     return /\S+@\S+\.\S+/.test(email);
//   };

//   // handle email change function
//   const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const emailValue = e.target.value;
//     setEmail(emailValue);
//     const extractedUsername = emailValue.split("@")[0]; // username is the part before the @
//     setUsername(extractedUsername);
//   };

//   const register = async () => {
//     if (!email || !password || !confirmPassword) {
//       Alert("Please fill out all fields.", "error");
//       return;
//     }

//     if (!validateEmail(email)) {
//       Alert("Invalid email format.", "error");
//       return;
//     }

//     if (password.length < 6) {
//       Alert("Password must be at least 6 characters.", "error");
//       return;
//     }

//     if (password !== confirmPassword) {
//       Alert("Passwords do not match.", "error");
//       return;
//     }

//     try {
//       await registerUser({ email, password, username }); // send to server
//       Alert("Registration successful!", "success");
//       navigate("/dashboard");
//     } catch {
//       Alert("Registration failed. Email might be taken.", "error");
//     }
//   };

//   const handleGoogleLoginSuccess = async (
//     credentialResponse: CredentialResponse
//   ) => {
//     try {
//       const { credential } = credentialResponse;

//       if (!credential) {
//         throw new Error("Google credential is missing.");
//       }

//       // sending credential to server
//       const user = await googleSignin({ credential });

//       localStorage.setItem("user", JSON.stringify(user)); // save logged in user
//       Alert("Google Registration/Login successful!", "success");
//       navigate("/dashboard");
//     } catch (error) {
//       console.error("Google registration/login error:", error);
//       Alert("Google registration/login failed.", "error");
//     }
//   };

//   return (
//     <div className="auth-container">
//       <div className="auth-box">
//         <h2>Sign up</h2>

//         <div className="auth-inputs">
//           <input
//             type="email"
//             placeholder="Your email address"
//             className="auth-input"
//             value={email}
//             onChange={handleEmailChange} // create a function to handle email change
//           />
//           <input
//             type="password"
//             placeholder="Password"
//             className="auth-input"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />
//           <input
//             type="password"
//             placeholder="Confirm Password"
//             className="auth-input"
//             value={confirmPassword}
//             onChange={(e) => setConfirmPassword(e.target.value)}
//           />
//         </div>

//         <button className="auth-btn" onClick={register}>
//           Sign Up
//         </button>

//         <div className="auth-divider">OR</div>

//         <GoogleLogin
//           onSuccess={handleGoogleLoginSuccess}
//           onError={() => Alert("Google login failed", "error")}
//         />

//         <p className="auth-footer">
//           Already have an account? <Link to="/login">Sign in</Link>
//         </p>
//       </div>
//     </div>
//   );
// }

// export default Register;

import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/user-service";
import Alert from "../components/Alert";
import "./Registration.css";

function Register({ setUser }: { setUser: (user: any) => void }) {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const handleRegister = async () => {
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

    try {
      const username = email.split("@")[0];
      const user = await registerUser({ username, email, password });
      setUser(user);
      localStorage.setItem("user", JSON.stringify(user));
      Alert("Registration successful!", "success");
      navigate("/dashboard");
    } catch {
      Alert("Registration failed.", "error");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Sign Up</h2>
        <input ref={emailRef} type="email" placeholder="Your email" />
        <input ref={passwordRef} type="password" placeholder="Password" />
        <input
          ref={confirmPasswordRef}
          type="password"
          placeholder="Confirm Password"
        />
        <button onClick={handleRegister}>Register</button>
      </div>
    </div>
  );
}

export default Register;

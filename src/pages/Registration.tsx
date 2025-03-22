// // import { useRef } from "react";
// // import { useNavigate } from "react-router-dom";
// // import { registerUser } from "../services/user-service";
// // import Alert from "../components/Alert";
// // import "./Registration.css";

// // function Register({ setUser }: { setUser: (user: any) => void }) {
// //   const emailRef = useRef<HTMLInputElement>(null);
// //   const passwordRef = useRef<HTMLInputElement>(null);
// //   const confirmPasswordRef = useRef<HTMLInputElement>(null);
// //   const navigate = useNavigate();

// //   const handleRegister = async () => {
// //     const email = emailRef.current?.value;
// //     const password = passwordRef.current?.value;
// //     const confirmPassword = confirmPasswordRef.current?.value;

// //     if (!email || !password || !confirmPassword) {
// //       Alert("Please fill out all fields.", "error");
// //       return;
// //     }

// //     if (password !== confirmPassword) {
// //       Alert("Passwords do not match.", "error");
// //       return;
// //     }

// //     try {
// //       const username = email.split("@")[0];
// //       const user = await registerUser({ username, email, password });
// //       setUser(user);
// //       localStorage.setItem("user", JSON.stringify(user));
// //       Alert("Registration successful!", "success");
// //       navigate("/dashboard");
// //     } catch {
// //       Alert("Registration failed.", "error");
// //     }
// //   };

// //   return (
// //     <div className="auth-container">
// //       <div className="auth-box">
// //         <h2>Sign Up</h2>
// //         <input ref={emailRef} type="email" placeholder="Your email" />
// //         <input ref={passwordRef} type="password" placeholder="Password" />
// //         <input
// //           ref={confirmPasswordRef}
// //           type="password"
// //           placeholder="Confirm Password"
// //         />
// //         <button onClick={handleRegister}>Register</button>
// //       </div>
// //     </div>
// //   );
// // }

// // export default Register;

// import { useRef } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import { registerUser, googleSignin } from "../services/user-service";
// import { GoogleLogin, CredentialResponse } from "@react-oauth/google";
// import Alert from "../components/Alert";
// import "./Registration.css";
// import { IUser } from "../types/index";

// function Register({ setUser }: { setUser: (user: IUser) => void }) {
//   const emailRef = useRef<HTMLInputElement>(null);
//   const passwordRef = useRef<HTMLInputElement>(null);
//   const confirmPasswordRef = useRef<HTMLInputElement>(null);
//   const navigate = useNavigate();

//   // ✅ Handle user registration
//   const handleRegister = async () => {
//     const email = emailRef.current?.value?.trim();
//     const password = passwordRef.current?.value?.trim();
//     const confirmPassword = confirmPasswordRef.current?.value?.trim();

//     if (!email || !password || !confirmPassword) {
//       Alert("Please fill out all fields.", "error");
//       return;
//     }

//     if (password !== confirmPassword) {
//       Alert("Passwords do not match.", "error");
//       return;
//     }

//     try {
//       const username = email.split("@")[0];
//       const authResponse = await registerUser({ username, email, password });

//       // ✅ Pass only the user object
//       setUser(authResponse.user);

//       localStorage.setItem("user", JSON.stringify(authResponse.user));

//       Alert("Registration successful!", "success");
//       navigate("/dashboard");
//     } catch {
//       Alert("Registration failed.", "error");
//     }
//   };

//   // ✅ Handle Google registration/login
//   const handleGoogleLoginSuccess = async (
//     credentialResponse: CredentialResponse
//   ) => {
//     try {
//       if (!credentialResponse.credential) {
//         throw new Error("Google authentication failed.");
//       }

//       const authResponse = await googleSignin({
//         credential: credentialResponse.credential,
//       });

//       // ✅ Pass only the user object
//       setUser(authResponse.user);

//       localStorage.setItem("user", JSON.stringify(authResponse.user));

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
//         <h2>Sign Up</h2>

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
//           <input
//             ref={confirmPasswordRef}
//             type="password"
//             placeholder="Confirm Password"
//             className="auth-input"
//           />
//         </div>

//         <button className="auth-btn" onClick={handleRegister}>
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
import { Link } from "react-router-dom";
import { useRegister } from "../hooks/useRegister";
import { IUser } from "../types";
import "./Login.css"; // שימוש בקלאסים קיימים

function Registration({ setUser }: { setUser: (user: IUser) => void }) {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const { register } = useRegister();

  const handleRegister = async () => {
    const email = emailRef.current?.value?.trim();
    const password = passwordRef.current?.value?.trim();

    if (!email || !password) {
      alert("Please fill all fields.");
      return;
    }

    try {
      const username = email.split("@")[0];
      const result = await register({ username, email, password });
      if (result.success && result.user) {
        setUser(result.user);
      }
    } catch {
      alert("Registration failed.");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Sign up</h2>
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
        <button className="auth-btn" onClick={handleRegister}>
          Create Account
        </button>
        <p className="auth-footer">
          Already have an account? <Link to="/login">Log in</Link>
        </p>
      </div>
    </div>
  );
}

export default Registration;

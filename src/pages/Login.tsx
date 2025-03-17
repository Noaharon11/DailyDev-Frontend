// import { useRef } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import { GoogleLogin, CredentialResponse } from "@react-oauth/google";
// import { loginUser, googleSignin } from "../services/user-service";
// import Alert from "../components/Alert";
// import "./Login.css";

// function Login() {
//   const emailRef = useRef<HTMLInputElement>(null);
//   const passwordRef = useRef<HTMLInputElement>(null);
//   const navigate = useNavigate();

//   const handleLogin = async () => {
//     const email = emailRef.current?.value;
//     const password = passwordRef.current?.value;

//     if (!email || !password) {
//       Alert("Please fill out all fields.", "error");
//       return;
//     }

//     try {
//       const user = await loginUser({ email, password });
//       if (user) {
//         localStorage.setItem("isLoggedIn", "true");
//         navigate("/dashboard");
//       } else {
//         Alert("Invalid email or password.", "error");
//       }
//     } catch {
//       Alert("Login failed due to server error.", "error");
//     }
//   };

//   const handleGoogleLoginSuccess = async (
//     credentialResponse: CredentialResponse
//   ) => {
//     try {
//       await googleSignin(credentialResponse);
//       localStorage.setItem("isLoggedIn", "true");
//       navigate("/dashboard");
//     } catch {
//       Alert("Google login failed.", "error");
//     }
//   };

//   return (
//     <div className="login-page">
//       <div className="login-container">
//         <h2>Login to DailyDev</h2>
//         <input
//           ref={emailRef}
//           type="email"
//           placeholder="Email"
//           className="form-control"
//         />
//         <input
//           ref={passwordRef}
//           type="password"
//           placeholder="Password"
//           className="form-control"
//         />

//         <button className="btn btn-primary mt-2" onClick={handleLogin}>
//           Login
//         </button>

//         <div className="google-btn mt-2">
//           <GoogleLogin
//             onSuccess={handleGoogleLoginSuccess}
//             onError={() => Alert("Google login error.", "error")}
//           />
//         </div>

//         <p className="mt-3">
//           Don't have an account? <Link to="/register">Sign up</Link>
//         </p>
//       </div>
//     </div>
//   );
// }

// export default Login;

import { Link } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { useLogin } from "../hooks/useLogin";
import "./Login.css";
import Alert from "../components/Alert";

function Login() {
  const { emailRef, passwordRef, handleLogin, handleGoogleLoginSuccess } =
    useLogin();

  return (
    <div className="login-page">
      <div className="login-container">
        <h2>Login to DailyDev</h2>

        <input
          ref={emailRef}
          type="email"
          placeholder="Email"
          className="form-control"
        />
        <input
          ref={passwordRef}
          type="password"
          placeholder="Password"
          className="form-control"
        />

        <button className="btn btn-primary mt-2" onClick={handleLogin}>
          Login
        </button>

        <div className="google-btn mt-2">
          <GoogleLogin
            onSuccess={handleGoogleLoginSuccess}
            onError={() => Alert("Google login error.", "error")}
          />
        </div>

        <p className="mt-3">
          Don't have an account? <Link to="/register">Sign up</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;

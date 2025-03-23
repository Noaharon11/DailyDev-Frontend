// import { useRef } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { useRegister } from "../hooks/useRegister";
// import { useUser } from "../contexts/UserContext";
// import "./Login.css"; // מותאם לקובץ העיצוב שלך

// function Registration() {
//   const { setCurrentUser, setIsAuthenticated } = useUser();
//   const emailRef = useRef<HTMLInputElement>(null);
//   const passwordRef = useRef<HTMLInputElement>(null);
//   const { register } = useRegister();
//   const navigate = useNavigate();

//   const handleRegister = async () => {
//     const email = emailRef.current?.value?.trim();
//     const password = passwordRef.current?.value?.trim();

//     if (!email || !password) {
//       alert("Please fill all fields.");
//       return;
//     }

//     try {
//       const username = email.split("@")[0];
//       const result = await register({ username, email, password });

//       if (result.success && result.user) {
//         setCurrentUser(result.user);
//         setIsAuthenticated(true);
//         navigate("/dashboard");
//       }
//     } catch {
//       alert("Registration failed.");
//     }
//   };

//   return (
//     <div className="auth-container">
//       <div className="auth-box">
//         <h2>Sign up</h2>
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
//         <button className="auth-btn" onClick={handleRegister}>
//           Create Account
//         </button>
//         <div className="auth-divider">OR</div>
//         <p className="auth-footer">
//           Already have an account? <Link to="/login">Log in</Link>
//         </p>
//       </div>
//     </div>
//   );
// }

// export default Registration;

import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRegister } from "../hooks/useRegister";
import { useUser } from "../contexts/UserContext";
import "./Login.css";

function Registration() {
  const { setCurrentUser, setIsAuthenticated } = useUser();
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const { register } = useRegister();
  const navigate = useNavigate();

  const handleRegister = async () => {
    const email = emailRef.current?.value?.trim();
    const password = passwordRef.current?.value?.trim();

    if (!email || !password) {
      alert("Please fill all fields.");
      return;
    }

    try {
      const username = email.split("@")[0];
      const result = await register({
        username,
        email,
        password,
        avatar: avatarFile,
      });

      if (result.success && result.user) {
        setCurrentUser(result.user);
        setIsAuthenticated(true);
        navigate("/dashboard");
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
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setAvatarFile(e.target.files?.[0] || null)}
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

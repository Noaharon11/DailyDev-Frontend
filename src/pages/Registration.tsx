// import { useState, useRef, ChangeEvent } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import { registerUser, googleSignin, IUser } from "../services/user-service";
// import { uploadPhoto } from "../services/file-service";
// import { GoogleLogin, CredentialResponse } from "@react-oauth/google";
// import Alert from "./Alert";
// import "./Registration.css";

// function Registration() {
//   const [imgSrc, setImgSrc] = useState<File | null>(null);
//   const usernameRef = useRef<HTMLInputElement>(null);
//   const emailRef = useRef<HTMLInputElement>(null);
//   const passwordRef = useRef<HTMLInputElement>(null);
//   const confirmPasswordRef = useRef<HTMLInputElement>(null);
//   const navigate = useNavigate();

//   const handleImgChange = (e: ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files[0]) {
//       setImgSrc(e.target.files[0]);
//     }
//   };

//   const register = async () => {
//     const username = usernameRef.current?.value;
//     const email = emailRef.current?.value;
//     const password = passwordRef.current?.value;
//     const confirmPassword = confirmPasswordRef.current?.value;

//     if (!username || !email || !password || !confirmPassword) {
//       Alert("Please fill out all fields.", "error");
//       return;
//     }

//     if (password !== confirmPassword) {
//       Alert("Passwords do not match.", "error");
//       return;
//     }

//     //use this code when you we use server
//     // let imgUrl = "";
//     // if (imgSrc) {
//     //   imgUrl = await uploadPhoto(imgSrc);
//     // }

//     let imgUrl = "";
//     if (imgSrc) {
//       try {
//         imgUrl = await uploadPhoto(imgSrc);
//       } catch (error) {
//         console.error("Image upload failed, skipping image:", error);
//         imgUrl = ""; // Reset imgUrl to empty string
//       }
//     }

//     const user: IUser = { username, email, password, imgUrl };

//     try {
//       await registerUser(user);
//       Alert("Registration successful!", "success");
//       navigate("/dashboard");
//     } catch {
//       Alert("Registration failed due to server error.", "error");
//     }
//   };

//   const handleGoogleLoginSuccess = async (
//     credentialResponse: CredentialResponse
//   ) => {
//     try {
//       await googleSignin(credentialResponse);
//       navigate("/dashboard");
//     } catch {
//       Alert("Google registration failed.", "error");
//     }
//   };

//   return (
//     <div className="registration-container">
//       <h2>Create a DailyDev Account</h2>
//       <input type="file" className="form-control" onChange={handleImgChange} />

//       {imgSrc && (
//         <img
//           src={URL.createObjectURL(imgSrc)}
//           alt="Profile Preview"
//           style={{ width: "100px", height: "100px" }}
//         />
//       )}

//       <input
//         ref={usernameRef}
//         type="text"
//         placeholder="Username"
//         className="form-control mt-2"
//       />
//       <input
//         ref={emailRef}
//         type="email"
//         placeholder="Email"
//         className="form-control mt-2"
//       />
//       <input
//         ref={passwordRef}
//         type="password"
//         placeholder="Password"
//         className="form-control mt-2"
//       />
//       <input
//         ref={confirmPasswordRef}
//         type="password"
//         placeholder="Confirm Password"
//         className="form-control mt-2"
//       />

//       <button className="btn btn-primary mt-3" onClick={register}>
//         Register
//       </button>

//       <div className="mt-3">
//         <GoogleLogin
//           onSuccess={handleGoogleLoginSuccess}
//           onError={() => Alert("Google login error.", "error")}
//         />
//       </div>

//       <p className="mt-3">
//         Already have an account? <Link to="/login">Log in</Link>
//       </p>
//     </div>
//   );
// }

// export default Registration;

import { Link } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { useRegister } from "../hooks/useRegister";
import "./Registration.css";
import Alert from "../components/Alert";

function Registration() {
  const {
    emailRef,
    passwordRef,
    confirmPasswordRef,
    imgSrc,
    handleImgChange,
    register,
    handleGoogleLoginSuccess,
  } = useRegister();

  return (
    <div className="registration-container">
      <h2>Create a DailyDev Account</h2>
      <input type="file" className="form-control" onChange={handleImgChange} />

      {imgSrc && (
        <img
          src={URL.createObjectURL(imgSrc)}
          alt="Profile Preview"
          style={{ width: "100px", height: "100px" }}
        />
      )}

      <input
        ref={emailRef}
        type="email"
        placeholder="Email"
        className="form-control mt-2"
      />
      <input
        ref={passwordRef}
        type="password"
        placeholder="Password"
        className="form-control mt-2"
      />
      <input
        ref={confirmPasswordRef}
        type="password"
        placeholder="Confirm Password"
        className="form-control mt-2"
      />

      <button className="btn btn-primary mt-3" onClick={register}>
        Register
      </button>

      <div className="mt-3">
        <GoogleLogin
          onSuccess={handleGoogleLoginSuccess}
          onError={() => Alert("Google login error.", "error")}
        />
      </div>

      <p className="mt-3">
        Already have an account? <Link to="/login">Log in</Link>
      </p>
    </div>
  );
}

export default Registration;

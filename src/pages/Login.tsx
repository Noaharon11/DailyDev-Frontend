import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GoogleLogin, CredentialResponse } from "@react-oauth/google";
import { loginUser, googleSignin } from "../services/user-service";
import Alert from "../components/Alert";
import { AuthResponse } from "../types/index";
import "./Login.css";

function Login({ setUser }: { setUser: (user: AuthResponse["user"]) => void }) {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  //Handle regular login
  // const handleLogin = async () => {
  //   const email = emailRef.current?.value?.trim();
  //   const password = passwordRef.current?.value?.trim();

  //   if (!email || !password) {
  //     Alert("Please fill out all fields.", "error");
  //     return;
  //   }

  //   try {
  //     const authResponse: AuthResponse = await loginUser(email, password);

  //     // Extract and store user
  //     console.log("Auth Response:", authResponse);
  //     setUser(authResponse.user);
  //     localStorage.setItem("user", JSON.stringify(authResponse.user));

  //     Alert("Login successful!", "success");
  //     navigate("/dashboard");
  //   } catch {
  //     Alert("Invalid email or password.", "error");
  //   }
  // };

  const handleLogin = async () => {
    const email = emailRef.current?.value?.trim();
    const password = passwordRef.current?.value?.trim();

    if (!email || !password) {
      Alert("Please fill out all fields.", "error");
      return;
    }

    try {
      console.log("Trying to login with:", email, password);
      const authResponse: AuthResponse = await loginUser(email, password);
      console.log("Auth Response:", authResponse);

      if (!authResponse || !authResponse.user) {
        throw new Error("Invalid response from server");
      }

      setUser(authResponse.user);
      localStorage.setItem("user", JSON.stringify(authResponse.user));

      Alert("Login successful!", "success");
      navigate("/dashboard");
    } catch (error) {
      console.error("Login error:", error);
      Alert("Invalid email or password.", "error");
    }
  };

  // const handleLogin = async () => {
  //   const email = emailRef.current?.value;
  //   const password = passwordRef.current?.value;

  //   if (!email || !password) {
  //     Alert("Please fill out all fields.", "error");
  //     return;
  //   }

  //   try {
  //     const user = await loginUser(email, password);
  //     if (!user) throw new Error("Invalid response from server");

  //
  //     localStorage.setItem("user", JSON.stringify(user));
  //     setUser(user);
  //     Alert("Login successful!", "success");
  //     navigate("/dashboard");
  //   } catch {
  //     Alert("Invalid email or password.", "error");
  //   }
  // };

  //  Handle Google login
  const handleGoogleLoginSuccess = async (
    credentialResponse: CredentialResponse
  ) => {
    try {
      if (!credentialResponse.credential) {
        throw new Error("Google credential is missing.");
      }

      const authResponse: AuthResponse = await googleSignin({
        credential: credentialResponse.credential,
      });

      //  Extract and store user
      setUser(authResponse.user);
      localStorage.setItem("user", JSON.stringify(authResponse.user));

      Alert("Google Login successful!", "success");
      navigate("/dashboard");
    } catch {
      Alert("Google login failed.", "error");
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
          onError={() => Alert("Google login error.", "error")}
        />
        <p className="auth-footer">
          Don’t have an account? <Link to="/register">Sign up</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;

import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GoogleLogin, CredentialResponse } from "@react-oauth/google";
import { loginUser, googleSignin } from "../services/user-service";
import Alert from "../components/Alert";
import "./Login.css";

function Login({ setUser }: { setUser: (user: any) => void }) {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const handleLogin = async () => {
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    if (!email || !password) {
      Alert("Please fill out all fields.", "error");
      return;
    }

    try {
      const user = await loginUser(email, password);
      setUser(user);
      localStorage.setItem("user", JSON.stringify(user));
      Alert("Login successful!", "success");
      navigate("/dashboard");
    } catch {
      Alert("Invalid email or password.", "error");
    }
  };

  const handleGoogleLoginSuccess = async (
    credentialResponse: CredentialResponse
  ) => {
    try {
      const { credential } = credentialResponse;
      if (!credential) throw new Error("Google credential is missing.");

      const user = await googleSignin({ credential });
      setUser(user);
      localStorage.setItem("user", JSON.stringify(user));
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

import { useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { GoogleLogin, CredentialResponse } from "@react-oauth/google";
import { useLogin } from "../hooks/useLogin";
import { useUser } from "../contexts/UserContext";
import "./Login.css";

function Login() {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const { login, loginWithGoogle } = useLogin();
  const { setCurrentUser, setIsAuthenticated } = useUser();

  const handleLogin = async () => {
    const email = emailRef.current?.value?.trim();
    const password = passwordRef.current?.value?.trim();

    if (!email || !password) {
      alert("Please fill all fields.");
      return;
    }

    const result = await login(email, password);
    if (result.success && result.user) {
      setCurrentUser(result.user);
      setIsAuthenticated(true);
      navigate("/dashboard");
    } else {
      alert("Login failed. Please check your credentials.");
    }
  };

  const handleGoogleLoginSuccess = async (
    credentialResponse: CredentialResponse
  ) => {
    if (!credentialResponse.credential) {
      alert("Missing Google credential.");
      return;
    }

    const result = await loginWithGoogle(credentialResponse);
    console.log("Credential response:", credentialResponse);

    if (!result.success) {
      console.error("Google login failed:", result.error);
      alert(result.error);
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

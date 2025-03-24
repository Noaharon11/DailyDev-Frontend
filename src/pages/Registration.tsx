// export default Registration;
import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRegister } from "../hooks/useRegister";
import { useUser } from "../contexts/UserContext";
import "./Login.css"; // עדכני אם יש Registration.css
import { loginUser } from "../services/user-service";

function Registration() {
  const { setCurrentUser, setIsAuthenticated } = useUser();
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);

  const { register, loading, error } = useRegister();
  const navigate = useNavigate();

  const handleRegister = async () => {
    const email = emailRef.current?.value?.trim();
    const password = passwordRef.current?.value?.trim();
    const confirmPassword = confirmPasswordRef.current?.value?.trim();

    if (!email || !password || !confirmPassword) {
      alert("Please fill in all fields.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    try {
      const username = email.split("@")[0];
      const result = await register({
        username,
        email,
        password,
        imageUrl: avatarFile,
      });

      if (result.success) {
        // Auto-login after successful registration
        try {
          const { user } = await loginUser(email, password);
          setCurrentUser(user);
          setIsAuthenticated(true);
          navigate("/dashboard");
        } catch (loginError) {
          console.error("Auto-login failed:", loginError);
          alert(
            "Registration succeeded, but login failed. Please login manually."
          );
          navigate("/login");
        }
      }
    } catch {
      alert("Registration failed.");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Sign up</h2>

        {avatarFile && (
          <img
            src={URL.createObjectURL(avatarFile)}
            alt="Profile Preview"
            className="avatar-preview"
          />
        )}

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
            ref={confirmPasswordRef}
            type="password"
            placeholder="Confirm Password"
            className="auth-input"
          />

          <label className="upload-btn">
            Upload Profile Picture
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setAvatarFile(e.target.files?.[0] || null)}
              style={{ display: "none" }}
            />
          </label>
        </div>

        {error && <p className="auth-error">{error}</p>}

        <button
          className="auth-btn"
          onClick={handleRegister}
          disabled={loading}
        >
          {loading ? "Creating Account..." : "Create Account"}
        </button>

        <p className="auth-footer">
          Already have an account? <Link to="/login">Log in</Link>
        </p>
      </div>
    </div>
  );
}

export default Registration;

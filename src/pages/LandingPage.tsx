import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LandingPage.css";

function LandingPage() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleStartClick = () => {
    navigate(isLoggedIn ? "/dashboard" : "/login");
  };

  return (
    <div className="landing-container">
      <div className="overlay"></div>
      <div className="landing-content">
        <h1>
          Welcome to <span>DailyDev</span>
        </h1>
        <p>Share your projects, collaborate, and grow together!</p>

        <button className="btn-start" onClick={handleStartClick}>
          Let's Start →
        </button>
      </div>
    </div>
  );
}

export default LandingPage;

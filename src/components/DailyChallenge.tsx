import React from "react";
import { useNavigate } from "react-router-dom";
import "./DailyChallenge.css";

const DailyChallenge: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="daily-challenge-card">
      <p>
        Today's challenge: <strong>Build a responsive Navbar!</strong>
      </p>
      <button onClick={() => navigate("/challenges")}>Go to Challenge</button>
    </div>
  );
};

export default DailyChallenge;

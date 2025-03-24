import React from "react";
import AiChallenge from "../components/AiChallenge";
import "./ChallengesPage.css";

const ChallengesPage: React.FC = () => {
  return (
    <div className="challenges-page">
      <div className="challenge-container">
        <h1 className="challenge-title">🔥 Daily Coding Challenge</h1>
        <p className="challenge-description">
          Get a new AI-generated coding challenge every day to sharpen your
          skills.
        </p>
        <AiChallenge />
      </div>
    </div>
  );
};

export default ChallengesPage;

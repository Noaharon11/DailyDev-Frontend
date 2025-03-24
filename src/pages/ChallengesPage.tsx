// import React from "react";
// import AiChallenge from "../components/AiChallenge";
// import "./ChallengesPage.css";

// const ChallengesPage: React.FC = () => {
//   return (
//     <div className="challenges-page">
//       <div className="challenge-container">
//         <h1 className="challenge-title">🔥 Daily Coding Challenge</h1>
//         <p className="challenge-description">
//           Boost your skills with a new AI-generated coding challenge every day.
//         </p>
//         <div className="challenge-card">
//           <AiChallenge />
//         </div>
//         <p className="motivational-line">
//           ✨ Keep going. One challenge a day = real progress.
//         </p>
//       </div>
//     </div>
//   );
// };

// export default ChallengesPage;

// src/pages/ChallengesPage.tsx
import React from "react";
import AiChallenge from "../components/AiChallenge";
import "./ChallengesPage.css";

const ChallengesPage: React.FC = () => {
  return (
    <div className="challenges-page">
      <div className="challenge-container">
        <h1 className="challenge-title">🔥 Daily Coding Challenge</h1>
        <p className="challenge-description">
          A new AI-powered challenge every day. Improve your skills one step at
          a time.
        </p>
        <AiChallenge />
      </div>
    </div>
  );
};

export default ChallengesPage;

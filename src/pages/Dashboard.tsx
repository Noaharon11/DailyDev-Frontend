// import React, { useState } from "react";
// import ProfileCard from "../components/ProfileCard";
// import PostsList from "../components/PostsList";
// import DailyChallenge from "../components/DailyChallenge";
// import CreatePost from "../components/CreatePost";
// import "./Dashboard.css";

// const Dashboard: React.FC = () => {
//   const [refreshTrigger, setRefreshTrigger] = useState(0);

//   const handlePostCreated = () => {
//     setRefreshTrigger((prev) => prev + 1);
//   };

//   return (
//     <div className="dashboard-container">
//       <div className="left-panel">
//         <ProfileCard />
//       </div>

//       <div className="main-panel">
//         <h1 className="dashboard-title">👋 Welcome to DailyDev!</h1>

//         <div className="challenge-section">
//           <h2>🔥 Daily Challenge</h2>
//           <DailyChallenge />
//         </div>

//         <CreatePost onPostCreated={handlePostCreated} />

//         <h3 className="section-title">📢 Latest Posts</h3>
//         <PostsList refreshTrigger={refreshTrigger} />
//       </div>
//     </div>
//   );
// };

// export default Dashboard;

import React, { useState } from "react";
import ProfileCard from "../components/ProfileCard";
import PostsList from "../components/PostsList";
import DailyChallenge from "../components/DailyChallenge";
import CreatePost from "../components/CreatePost";
import "./Dashboard.css";

const Dashboard: React.FC = () => {
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handlePostCreated = () => {
    setRefreshTrigger((prev) => prev + 1);
  };

  return (
    <div className="dashboard-layout">
      <div className="dashboard-container">
        <aside className="dashboard-sidebar">
          <ProfileCard />
        </aside>

        <main className="dashboard-main">
          <h1 className="dashboard-welcome">👋 Welcome to DailyDev!</h1>

          <section className="daily-challenge-box">
            <h2>🔥 Daily Challenge</h2>
            <DailyChallenge />
          </section>

          <CreatePost onPostCreated={handlePostCreated} />

          <h3 className="section-title">📢 Latest Posts</h3>
          <PostsList refreshTrigger={refreshTrigger} />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;

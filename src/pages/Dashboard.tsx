import React, { useState } from "react";
import ProfileCard from "../components/ProfileCard";
import PostsList from "../components/PostsList";
import AiChallenge from "../components/AiChallenge";
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
            <AiChallenge />
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

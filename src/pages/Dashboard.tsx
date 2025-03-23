// import React, { useEffect, useState } from "react";
// import { fetchAllPosts, createPost } from "../services/posts-service";
// import { IPost } from "../types";
// import { useUser } from "../contexts/UserContext";
// import ProfileCard from "../components/ProfileCard";
// import PostsList from "../components/PostsList";
// import Alert from "../components/Alert";
// import "./Dashboard.css";

// const Dashboard = () => {
//   const { currentUser } = useUser();
//   const [posts, setPosts] = useState<IPost[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [newContent, setNewContent] = useState("");

//   useEffect(() => {
//     const loadDashboardData = async () => {
//       try {
//         const fetchedPosts = await fetchAllPosts();
//         setPosts(fetchedPosts);
//       } catch (error) {
//         console.error("❌ Error fetching data:", error);
//         setError("Error loading dashboard data.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadDashboardData();
//   }, []);

//   const handlePostSubmit = async () => {
//     if (!newContent.trim()) {
//       Alert("Content is required", "error");
//       return;
//     }

//     try {
//       await createPost(newContent);
//       Alert("Post created!", "success");
//       setNewContent("");

//       const updatedPosts = await fetchAllPosts();
//       setPosts(updatedPosts);
//     } catch {
//       Alert("Failed to create post", "error");
//     }
//   };

//   return (
//     <div className="dashboard-container">
//       {/* ✅ Profile Card */}
//       <ProfileCard />

//       <div className="dashboard-main">
//         <h1 className="dashboard-title">👋 Welcome to DailyDev!</h1>

//         {/* ✅ Daily Challenge section */}
//         <h2 className="section-title">🔥 Daily Challenge</h2>
//         <div className="daily-challenge">
//           <p>Today's challenge: Build a responsive Navbar!</p>
//           <button>Go to Challenge</button>
//         </div>

//         {/* ✅ Create Post section */}
//         <div className="post-box">
//           <textarea
//             value={newContent}
//             onChange={(e) => setNewContent(e.target.value)}
//             placeholder="What's on your mind?"
//             rows={3}
//           />
//           <button onClick={handlePostSubmit}>Post</button>
//         </div>

//         {/* ✅ Posts List */}
//         <h2 className="section-title">📢 Latest Posts</h2>
//         <div className="posts-section">
//           {loading ? (
//             <p>Loading...</p>
//           ) : error ? (
//             <p>{error}</p>
//           ) : (
//             <PostsList posts={posts} currentUser={currentUser} />
//           )}
//         </div>
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
    <div className="dashboard-container">
      <div className="left-panel">
        <ProfileCard />
      </div>

      <div className="main-panel">
        <h1 className="dashboard-title">👋 Welcome to DailyDev!</h1>

        <div className="challenge-section">
          <h2>🔥 Daily Challenge</h2>
          <DailyChallenge />
        </div>

        <CreatePost onPostCreated={handlePostCreated} />

        <h3 className="section-title">📢 Latest Posts</h3>
        <PostsList refreshTrigger={refreshTrigger} />
      </div>
    </div>
  );
};

export default Dashboard;

// import { useEffect, useState } from "react";
// import { IPost, IUser } from "../types/index";
// import { fetchAllPosts } from "../services/posts-service";
// import { getUserProfile } from "../services/user-service";
// import Post from "../components/Post";
// import Alert from "../components/Alert";
// import "./Dashboard.css";

// const Dashboard = () => {
//   const [posts, setPosts] = useState<IPost[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);
//   const [currentUser, setCurrentUser] = useState<IUser | null>(null);

//   useEffect(() => {
//     const loadPosts = async () => {
//       try {
//         const fetchedPosts = await fetchAllPosts();
//         setPosts(fetchedPosts);
//         const userProfile = await getUserProfile();
//         setCurrentUser(userProfile);
//       } catch {
//         setError("Error loading posts! Using mock data.");
//         Alert("Error loading posts!", "warning");
//         setPosts([
//           {
//             _id: "1",
//             author: "JohnDoe",
//             content: "Excited to be here! 🚀",
//             likes: [],
//             commentsCount: 2,
//           },
//           {
//             _id: "2",
//             author: "JaneDev",
//             content: "Check out my new React app!",
//             likes: [],
//             commentsCount: 3,
//           },
//         ]);
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadPosts();
//   }, []);

//   return (
//     <div className="dashboard-container">
//       <div className="dashboard-content">
//         {/* 🔥 תיבת יצירת פוסט */}
//         <div className="post-box">
//           <textarea placeholder="What's on your mind?" className="post-input" />
//           <button className="post-btn">Post</button>
//         </div>

//         {/* 🔥 אזור האתגר היומי */}
//         <div className="daily-challenge">
//           <h2>🔥 Daily Challenge</h2>
//           <p>Today's challenge: Build a responsive Navbar!</p>
//           <button className="challenge-btn">Go to Challenge</button>
//         </div>

//         {/* 🔥 הצגת פוסטים */}
//         <div className="posts-section">
//           {loading ? (
//             <p className="loading-text">Loading...</p>
//           ) : error ? (
//             <p className="error-text">Error loading posts! Using mock data.</p>
//           ) : (
//             posts.map((post) => (
//               <Post key={post._id} {...post} currentUser={currentUser} />
//             ))
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;

import React, { useEffect, useState } from "react";
import { fetchAllPosts } from "../services/posts-service";
import { getUserProfile } from "../services/user-service";
import { IPost, IUser } from "../types";
import Post from "../components/Post";
import ProfileCard from "../components/ProfileCard";
import "./Dashboard.css";

console.log("📢 Fetching user profile...");
console.log("📢 Fetching posts...");

const Dashboard = () => {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [currentUser, setCurrentUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        const user = await getUserProfile();
        console.log("✅ User Profile:", user);

        const fetchedPosts = await fetchAllPosts();
        console.log("✅ Posts:", fetchedPosts);

        setCurrentUser(user);
        setPosts(fetchedPosts);
      } catch (error) {
        console.error("❌ Error fetching data:", error);
        setError("Error loading dashboard data.");
      } finally {
        setLoading(false);
      }
    };

    loadDashboardData();
  }, []);

  return (
    <div className="dashboard-container">
      <div className="dashboard-content">
        {currentUser && <ProfileCard user={currentUser} isCurrentUser={true} />}

        <div className="main-feed">
          <div className="post-box">
            <input type="text" placeholder="What's on your mind?" />
            <button>Post</button>
          </div>

          <div className="daily-challenge">
            <h2>🔥 Daily Challenge</h2>
            <p>Today's challenge: Build a responsive Navbar!</p>
            <button>Go to Challenge</button>
          </div>

          <div className="posts-section">
            {loading ? (
              <p>Loading...</p>
            ) : error ? (
              <p>{error}</p>
            ) : (
              posts.map((post) => (
                <Post key={post._id} {...post} currentUser={currentUser} />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

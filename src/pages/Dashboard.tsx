// import React, { useEffect, useState } from "react";
// import { fetchAllPosts } from "../services/posts-service";
// import { getUserProfile } from "../services/user-service";
// import { IPost, IUser } from "../types";
// import Post from "../components/Post";
// import ProfileCard from "../components/ProfileCard";
// import "./Dashboard.css";

// const Dashboard = () => {
//   const [posts, setPosts] = useState<IPost[]>([]);
//   const [currentUser, setCurrentUser] = useState<IUser | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const loadDashboardData = async () => {
//       try {
//         const user = await getUserProfile();
//         setCurrentUser(user);

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

//   return (
//     <div className="dashboard-container">
//       <div className="dashboard-content">
//         {/* Profile Card on the right side */}
//         {currentUser && <ProfileCard user={currentUser} isCurrentUser={true} />}

//         {/* Main Content - Feed */}
//         <div className="main-feed">
//           <h2 className="feed-title">📢 Latest Posts</h2>

//           {/* Post Box (for creating a new post) */}
//           <div className="post-box">
//             <input type="text" placeholder="What's on your mind?" />
//             <button>Post</button>
//           </div>

//           {/* Daily Challenge (on the left) */}
//           <div className="daily-challenge">
//             <h2>🔥 Daily Challenge</h2>
//             <p>Today's challenge: Build a responsive Navbar!</p>
//             <button>Go to Challenge</button>
//           </div>

//           {/* Displaying Posts */}
//           <div className="posts-section">
//             {loading ? (
//               <p>Loading...</p>
//             ) : error ? (
//               <p>{error}</p>
//             ) : posts.length === 0 ? (
//               <p>No posts available. Be the first to post!</p>
//             ) : (
//               posts.map((post) => (
//                 <Post key={post._id} post={post} currentUser={currentUser} />
//               ))
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;

import React, { useEffect, useState } from "react";
import { fetchAllPosts, createPost } from "../services/posts-service";
import { getUserProfile } from "../services/user-service";
import { IPost, IUser } from "../types";
import Post from "../components/Post";
import ProfileCard from "../components/ProfileCard";
import Alert from "../components/Alert";
import "./Dashboard.css";

const Dashboard = () => {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [currentUser, setCurrentUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [newContent, setNewContent] = useState("");

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        const user = await getUserProfile();
        setCurrentUser(user);

        const fetchedPosts = await fetchAllPosts();
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

  const handlePostSubmit = async () => {
    if (!newContent.trim()) {
      Alert("Content is required", "error");
      return;
    }

    try {
      await createPost(newContent);
      Alert("Post created!", "success");
      setNewContent("");

      // Reload posts
      const updatedPosts = await fetchAllPosts();
      setPosts(updatedPosts);
    } catch {
      Alert("Failed to create post", "error");
    }
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-content">
        {/* Profile Card */}
        {currentUser && <ProfileCard user={currentUser} isCurrentUser={true} />}

        {/* Feed */}
        <div className="main-feed">
          <h2 className="feed-title">📢 Latest Posts</h2>

          {/* ✅ Post Creation Box */}
          <div className="post-box">
            <textarea
              value={newContent}
              onChange={(e) => setNewContent(e.target.value)}
              placeholder="What's on your mind?"
              rows={3}
            />
            <button onClick={handlePostSubmit}>Post</button>
          </div>

          {/* Challenge Box */}
          <div className="daily-challenge">
            <h2>🔥 Daily Challenge</h2>
            <p>Today's challenge: Build a responsive Navbar!</p>
            <button>Go to Challenge</button>
          </div>

          {/* Displaying Posts */}
          <div className="posts-section">
            {loading ? (
              <p>Loading...</p>
            ) : error ? (
              <p>{error}</p>
            ) : posts.length === 0 ? (
              <p>No posts available. Be the first to post!</p>
            ) : (
              posts.map((post) => (
                <Post key={post._id} post={post} currentUser={currentUser} />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

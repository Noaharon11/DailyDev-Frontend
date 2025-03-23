// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { fetchUserProfile } from "../services/user-service";
// import { fetchPostsByUser } from "../services/posts-service";
// import { IUser, IPost } from "../types";
// import Post from "../components/Post";
// import ProfileCard from "../components/ProfileCard";
// import "./ProfilePage.css";

// const ProfilePage: React.FC = () => {
//   const { id } = useParams(); // Get user ID from URL
//   const [user, setUser] = useState<IUser | null>(null);
//   const [posts, setPosts] = useState<IPost[]>([]);
//   const currentUserId = localStorage.getItem("userId"); // Retrieve current user ID

//   useEffect(() => {
//     if (!id) {
//       console.warn("Missing user ID in URL");
//       return;
//     }

//     const loadUserData = async () => {
//       try {
//         const userData = await fetchUserProfile(id);
//         setUser(userData);

//         const userPosts = await fetchPostsByUser(id);
//         setPosts(userPosts);
//       } catch (error) {
//         console.error("Failed to load user data:", error);
//       }
//     };

//     loadUserData();
//   }, [id]);

//   if (!user) return <div>Loading profile...</div>;

//   const isCurrentUser = currentUserId === user._id;

//   return (
//     <div className="profile-page">
//       {/* Profile card with modal support */}
//       <ProfileCard
//         user={user}
//         isCurrentUser={isCurrentUser}
//         onUpdate={(updatedUser) => setUser(updatedUser)}
//       />

//       <h3 className="section-title">User's Posts</h3>
//       <div className="user-posts">
//         {posts.length === 0 ? (
//           <p>No posts yet.</p>
//         ) : (
//           posts.map((post) => (
//             <Post key={post._id} post={post} currentUser={user} />
//           ))
//         )}
//       </div>
//     </div>
//   );
// };

// export default ProfilePage;

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchUserProfile } from "../services/user-service";
import { fetchPostsByUser } from "../services/posts-service";
import { IUser, IPost } from "../types";
import Post from "../components/Post";
import ProfileCard from "../components/ProfileCard";
import { useUser } from "../contexts/UserContext";
import "./ProfilePage.css";

const ProfilePage: React.FC = () => {
  const { userId } = useParams(); // Get user ID from URL
  const { currentUser } = useUser(); // Get current logged-in user from context

  const [user, setUser] = useState<IUser | null>(null);
  const [posts, setPosts] = useState<IPost[]>([]);

  useEffect(() => {
    if (!userId) {
      console.warn("Missing user ID in URL");
      return;
    }

    const loadUserData = async () => {
      try {
        const userData = await fetchUserProfile(userId);
        setUser(userData);

        const userPosts = await fetchPostsByUser(userId);
        setPosts(userPosts);
      } catch (error) {
        console.error("Failed to load user data:", error);
      }
    };

    loadUserData();
  }, [userId]);

  if (!user) return <div>Loading profile...</div>;

  // Compare current user to profile user
  const isCurrentUser = currentUser?._id === user._id;

  return (
    <div className="profile-page">
      {/* Profile card */}
      <ProfileCard
        user={user}
        isCurrentUser={isCurrentUser}
        onUpdate={(updatedUser) => setUser(updatedUser)}
      />

      <h3 className="section-title">User's Posts</h3>
      <div className="user-posts">
        {posts.length === 0 ? (
          <p>No posts yet.</p>
        ) : (
          posts.map((post) => (
            <Post key={post._id} post={post} currentUser={currentUser} />
          ))
        )}
      </div>
    </div>
  );
};

export default ProfilePage;

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchUserProfile } from "../services/user-service";
import { IUser, IPost } from "../types";
import ProfileCard from "../components/ProfileCard";
import Post from "../components/Post";
import "./ProfilePage.css";
import { fetchPostsByUser } from "../services/posts-service";

const ProfilePage: React.FC = () => {
  const { userId } = useParams();
  const [user, setUser] = useState<IUser | null>(null);
  const [posts, setPosts] = useState<IPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        if (!userId) return;
        const userProfile = await fetchUserProfile(userId);
        const userPosts = await fetchPostsByUser(userId);
        setUser(userProfile);
        setPosts(userPosts);
      } catch (error) {
        console.error("Error loading profile:", error);
      } finally {
        setLoading(false);
      }
    };
    loadProfile();
  }, [userId]);

  if (loading) return <p>Loading...</p>;
  if (!user) return <p>User not found.</p>;

  return (
    <div className="profile-page">
      <ProfileCard user={user} isCurrentUser={false} />
      <h2>{user.username}'s Posts</h2>
      <div className="posts-section">
        {posts.length > 0 ? (
          posts.map((post) => (
            <Post key={post._id} post={post} currentUser={user} />
          ))
        ) : (
          <p>No posts yet.</p>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;

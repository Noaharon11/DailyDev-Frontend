import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchPostsByUser } from "../services/posts-service";
import { IUser, IPost } from "../types";
import ProfileCard from "../components/ProfileCard";
import UserPostsList from "../components/UserPostsList";
import "./ProfilePage.css";

const ProfilePage: React.FC = () => {
  const { userId } = useParams();
  const [user, setUser] = useState<IUser | null>(null);
  const [posts, setPosts] = useState<IPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        setError(null);

        // שליפת נתוני המשתמש
        const userData = await fetch(`/api/users/${userId}`).then((res) =>
          res.json()
        );
        setUser(userData);

        // שליפת הפוסטים של המשתמש
        const userPosts = await fetchPostsByUser(userId!);
        setPosts(userPosts);
      } catch (err) {
        setError("Failed to load user data.");
      } finally {
        setLoading(false);
      }
    };

    if (userId) fetchUserData();
  }, [userId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="error">{error}</p>;
  if (!user) return <p>User not found.</p>;

  return (
    <div className="profile-page">
      {/* כרטיס משתמש */}
      <div className="profile-header">
        <img
          src={user.imageUrl || "/photo.png"}
          alt="Profile"
          className="profile-image"
        />
        <h1 className="profile-name">{user.username}</h1>
        {user.bio && <p className="profile-bio">{user.bio}</p>}
        <p className="profile-email">{user.email}</p>
      </div>

      {/* רשימת הפוסטים */}
      <h2 className="posts-title">{user.username}'s Posts</h2>
      <UserPostsList posts={posts} />
    </div>
  );
};

export default ProfilePage;

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchPostsByUser } from "../services/posts-service";
import { getUserProfile } from "../services/user-service";
import { IPost, IUser } from "../types";
import Post from "../components/Post";
import "./ProfilePage.css";

const Profile = () => {
  const { userId } = useParams<{ userId: string }>(); // לוקח את ה-id מה-URL
  const [user, setUser] = useState<IUser | null>(null);
  const [posts, setPosts] = useState<IPost[]>([]);
  const [currentUser, setCurrentUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        // להביא את פרטי המשתמש מהשרת
        const userProfile = await getUserProfile();
        setCurrentUser(userProfile);

        if (userId) {
          // אם יש userId, להביא את הפרופיל של אותו משתמש
          const response = await fetch(`/users/${userId}`);
          const userData: IUser = await response.json();
          setUser(userData);

          // להביא את כל הפוסטים של המשתמש הזה
          const fetchedPosts = await fetchPostsByUser(userId);
          setPosts(fetchedPosts);
        }
      } catch {
        console.error("Failed to load user profile");
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, [userId]);

  if (loading) return <p>Loading profile...</p>;

  if (!user) return <p>User not found</p>;

  return (
    <div className="profile-container">
      <div className="profile-header">
        <img
          src={user.imageUrl || "/default_avatar.png"}
          alt="User Avatar"
          className="profile-avatar"
        />
        <h2>{user.username}</h2>
        {currentUser?._id === user._id && (
          <button className="edit-profile-btn">Edit Profile</button>
        )}
      </div>

      <h3>📌 {user.username}'s Posts</h3>
      <div className="posts-section">
        {posts.length === 0 ? (
          <p>No posts yet.</p>
        ) : (
          posts.map((post) => (
            <Post key={post._id} {...post} currentUser={currentUser} />
          ))
        )}
      </div>
    </div>
  );
};

export default Profile;

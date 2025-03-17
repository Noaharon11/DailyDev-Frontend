import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IPost } from "../types";
import Post from "../components/Post";
import "./ProfilePage.css";

function ProfilePage() {
  const { id } = useParams(); // מזהה המשתמש מה-URL
  const [user, setUser] = useState<{
    username: string;
    imgUrl?: string;
  } | null>(null);
  const [posts, setPosts] = useState<IPost[]>([]);

  useEffect(() => {
    // סימולציה של שליפת נתוני המשתמש לפי ID
    setUser({
      username: "JohnDoe",
      imgUrl: `https://api.dicebear.com/7.x/bottts/svg?seed=JohnDoe`,
    });

    // סימולציה של שליפת הפוסטים של המשתמש
    setPosts([
      {
        id: "1",
        username: "JohnDoe",
        text: "My first post on DailyDev! 🚀",
        imgUrl: "https://source.unsplash.com/random/300x200",
        likes: 20,
        comments: [],
      },
      {
        id: "2",
        username: "JohnDoe",
        text: "Excited to be here! 👨‍💻",
        imgUrl: "https://source.unsplash.com/random/300x201",
        likes: 8,
        comments: [],
      },
    ]);
  }, [id]);

  if (!user) return <p>Loading profile...</p>;

  return (
    <div className="profile-container">
      <div className="profile-header">
        <img src={user.imgUrl} alt="Profile" className="profile-img" />
        <h2>{user.username}</h2>
        <button className="btn btn-edit">Edit Profile</button>
      </div>

      <div className="profile-posts">
        <h3>Posts by {user.username}</h3>
        {posts.length > 0 ? (
          posts.map((post) => (
            <Post
              key={post.id}
              {...post}
              onLike={() => {}}
              onComment={() => {}}
            />
          ))
        ) : (
          <p>No posts yet.</p>
        )}
      </div>
    </div>
  );
}

export default ProfilePage;

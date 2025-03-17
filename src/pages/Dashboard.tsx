// import AppNavbar from "../components/Navbar";
// import { Container } from "react-bootstrap";

// function Dashboard() {
//   return (
//     <>
//       <AppNavbar />
//       <Container className="mt-4">
//         <h1>Welcome to Your Dashboard 🎉</h1>
//         <p>Let's build something amazing!</p>
//       </Container>
//     </>
//   );
// }

// export default Dashboard;

import AppNavbar from "../components/Navbar";
import { Container } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Alert from "../components/Alert";
import Post from "../components/Post";
import { IPost } from "../types";

function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState<{ username: string } | null>(null);
  const [posts, setPosts] = useState<IPost[]>([
    {
      id: "1",
      username: "JohnDoe",
      text: "Just finished a cool React project! 🚀",
      imgUrl: "https://source.unsplash.com/random/300x200",
      likes: 10,
      comments: [],
    },
    {
      id: "2",
      username: "JaneDev",
      text: "Excited to share my first TypeScript app!",
      imgUrl: "https://source.unsplash.com/random/300x201",
      likes: 5,
      comments: [],
    },
  ]);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      Alert("You must be logged in!", "error");
      navigate("/login");
    }
  }, [navigate]);

  const handleLike = (postId: string) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId ? { ...post, likes: post.likes + 1 } : post
      )
    );
  };

  const handleComment = (postId: string) => {
    Alert(`Comment on post ${postId} coming soon!`, "info");
  };

  return (
    <>
      <AppNavbar />
      <Container className="mt-4">
        <h1>Welcome, {user?.username || "Guest"} 🎉</h1>
        <p>Let's build something amazing!</p>

        <div className="posts-section">
          {posts.map((post) => (
            <Post
              key={post.id}
              {...post}
              onLike={() => handleLike(post.id)}
              onComment={() => handleComment(post.id)}
            />
          ))}
        </div>
      </Container>
    </>
  );
}

export default Dashboard;

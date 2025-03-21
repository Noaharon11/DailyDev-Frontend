import { useEffect, useState } from "react";
import { fetchPostsByUser } from "../services/posts-service";
import Post from "./Post";
import { IPost } from "../types";

interface UserPostsListProps {
  userId: string;
}

const UserPostsList: React.FC<UserPostsListProps> = ({ userId }) => {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const userPosts = await fetchPostsByUser(userId);
        setPosts(userPosts);
      } catch {
        setError("Failed to load user's posts.");
      } finally {
        setLoading(false);
      }
    };
    loadPosts();
  }, [userId]);

  return (
    <div className="user-posts-list">
      {loading ? (
        <p>Loading posts...</p>
      ) : error ? (
        <p>{error}</p>
      ) : posts.length === 0 ? (
        <p>No posts yet.</p>
      ) : (
        posts.map((post) => <Post key={post._id} {...post} />)
      )}
    </div>
  );
};

export default UserPostsList;

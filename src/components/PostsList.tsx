import React, { useEffect, useState } from "react";
import { fetchAllPosts } from "../services/posts-service";
import { IPost } from "../types";
import Post from "../components/Post";
import "./PostsList.css";

interface PostsListProps {
  refreshTrigger?: number; // Optional trigger to refresh list externally
}

const PostsList: React.FC<PostsListProps> = ({ refreshTrigger }) => {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [loading, setLoading] = useState(true);

  const loadPosts = async () => {
    try {
      setLoading(true);
      const data = await fetchAllPosts(); // Fetch from server
      setPosts(data.reverse()); // Show newest first
    } catch (err) {
      console.error("Failed to fetch posts", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPosts();
  }, [refreshTrigger]); // Refetch when trigger changes

  if (loading) return <p>Loading posts...</p>;

  return (
    <div className="posts-list">
      {posts.length === 0 ? (
        <p className="no-posts">No posts yet.</p>
      ) : (
        posts.map((post) => <Post key={post._id} post={post} />)
      )}
    </div>
  );
};

export default PostsList;

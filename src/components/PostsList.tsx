// src/components/PostsList.tsx
import React, { useEffect, useState } from "react";
import { IPost, IUser } from "../types";
import { fetchAllPosts } from "../services/posts-service";
import Post from "./Post";
import Alert from "./Alert";

interface PostsListProps {
  currentUser: IUser | null;
}

const PostsList: React.FC<PostsListProps> = ({ currentUser }) => {
  const [posts, setPosts] = useState<IPost[]>([]);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const fetchedPosts = await fetchAllPosts();
        // Sort posts by createdAt (newest first)
        const sortedPosts = fetchedPosts.sort(
          (a, b) =>
            new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime()
        );
        setPosts(sortedPosts);
      } catch {
        Alert("Failed to load posts", "error");
      }
    };

    loadPosts();
  }, []);

  return (
    <div>
      {posts.map((post) => (
        <Post key={post._id} post={post} currentUser={currentUser} />
      ))}
    </div>
  );
};

export default PostsList;

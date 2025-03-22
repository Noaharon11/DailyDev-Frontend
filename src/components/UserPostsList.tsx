import React from "react";
import { IPost } from "../types/index";
import Post from "./Post";
import "./UserPostsList.css";

interface UserPostsListProps {
  posts: IPost[];
}

const UserPostsList: React.FC<UserPostsListProps> = ({ posts }) => {
  return (
    <div className="user-posts-list">
      {posts.length > 0 ? (
        posts.map((post) => <Post key={post._id} post={post} />)
      ) : (
        <p className="no-posts">No posts yet.</p>
      )}
    </div>
  );
};

export default UserPostsList;

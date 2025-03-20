import React from "react";
import { IPost, IUser } from "../types";
import "./Post.css";

interface PostProps extends IPost {
  currentUser: IUser | null;
}

const Post: React.FC<PostProps> = ({
  _id,
  author,
  content,
  imageUrl,
  likes,
  currentUser,
}) => {
  const isOwner =
    currentUser?._id === (typeof author === "string" ? author : author._id);

  return (
    <div className="post-container">
      <div className="post-header">
        <img
          src={
            typeof author === "string"
              ? "/default-avatar.png"
              : author.imageUrl || "/default-avatar.png"
          }
          alt="User"
          className="post-avatar"
        />
        <div>
          <h3 className="post-author">
            {typeof author === "string" ? author : author.username}
          </h3>
          <p className="post-timestamp">2h ago</p>
        </div>
        {isOwner && <button className="edit-btn">✏️</button>}
      </div>

      <p className="post-content">{content}</p>
      {imageUrl && <img src={imageUrl} alt="Post" className="post-image" />}

      <div className="post-actions">
        <button className="like-btn">❤️ {likes.length}</button>
        <button className="comment-btn">💬 Comment</button>
      </div>
    </div>
  );
};

export default Post;

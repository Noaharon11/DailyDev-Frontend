import React from "react";
import { IComment, IUser } from "../types";
import "./Comment.css";

interface CommentProps extends IComment {
  currentUser: IUser | null;
}

const Comment: React.FC<CommentProps> = ({ content, ownerId, currentUser }) => {
  const isOwner = currentUser?._id === ownerId;

  return (
    <div className="comment-container">
      <p className="comment-text">{content}</p>
      {isOwner && <button className="delete-btn">🗑️</button>}
    </div>
  );
};

export default Comment;

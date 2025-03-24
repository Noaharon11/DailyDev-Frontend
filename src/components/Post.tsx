import React, { useState } from "react";
import { IPost, IUser } from "../types";
import {
  likePost,
  unlikePost,
  deletePost,
  updatePost,
} from "../services/posts-service";
import { useNavigate } from "react-router-dom";
import Alert, { ConfirmAlert } from "./Alert";
import { useUser } from "../contexts/UserContext";
import "./Post.css";
//import CommentsModal from "./CommentsModal";
import CommentsModalPortal from "./CommentsModalPortal";

interface PostProps {
  post: IPost;
  currentUser?: IUser | null;
  onPostChanged?: () => void;
}

const Post: React.FC<PostProps> = ({ post, onPostChanged }) => {
  const { currentUser } = useUser();
  const { _id, content, image, createdAt, updatedAt } = post;

  const navigate = useNavigate();
  //const [showComments, setShowComments] = useState(false);

  const [postLikes, setPostLikes] = useState<string[]>(
    post.likes.map((like) => (typeof like === "string" ? like : like._id))
  );
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(content);
  const [showComments, setShowComments] = useState(false);

  const postAuthor = post.owner as IUser;
  const isOwner = currentUser?._id === postAuthor?._id;
  const isLikedByUser = currentUser
    ? postLikes.includes(currentUser._id)
    : false;

  const handleLikeToggle = async () => {
    if (!currentUser) return;
    try {
      if (isLikedByUser) {
        await unlikePost(_id, currentUser._id);
        setPostLikes(postLikes.filter((id) => id !== currentUser._id));
      } else {
        await likePost(_id, currentUser._id);
        setPostLikes([...postLikes, currentUser._id]);
      }
    } catch {
      Alert("Failed to toggle like", "error");
    }
  };

  const handleDelete = async () => {
    const confirm = await ConfirmAlert(
      "Delete Post",
      "Are you sure you want to delete this post?"
    );
    if (!confirm) return;

    try {
      await deletePost(_id);
      Alert("Post deleted", "success");
      onPostChanged?.();
    } catch {
      Alert("Failed to delete post", "error");
    }
  };

  const handleUpdate = async () => {
    const confirm = await ConfirmAlert(
      "Save Changes",
      "Are you sure you want to update this post?"
    );
    if (!confirm) return;

    try {
      await updatePost(_id, editedContent);
      setIsEditing(false);
      Alert("Post updated", "success");
      onPostChanged?.();
    } catch {
      Alert("Failed to update post", "error");
    }
  };

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-GB") + ", " + date.toLocaleTimeString();
  };

  return (
    <div className="post-container">
      <div className="post-header-row">
        <div className="post-header">
          <img
            className="post-avatar"
            src={postAuthor?.profilePicture || "/src/assets/photo.png"}
            alt="avatar"
          />
          <h3
            className="post-author clickable"
            onClick={() => navigate("/profile/" + postAuthor?._id)}
          >
            {postAuthor?.username || "Unknown"}
          </h3>
        </div>

        <div className="post-meta">
          <span className="post-date">
            {updatedAt && updatedAt !== createdAt
              ? formatDate(updatedAt)
              : formatDate(createdAt)}
          </span>
          {isOwner && !isEditing && (
            <button className="delete-btn" onClick={handleDelete}>
              Delete
            </button>
          )}
        </div>
      </div>

      {isEditing ? (
        <div className="edit-box">
          <textarea
            className="edit-textarea"
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
          />
          <div className="edit-actions">
            <button onClick={handleUpdate}>Save</button>
            <button onClick={() => setIsEditing(false)}>Cancel</button>
          </div>
        </div>
      ) : (
        <>
          <p className="post-content">{content}</p>
          {image && <img src={image} className="post-image" alt="Post" />}
        </>
      )}

      <div className="post-actions">
        <button
          className={`like-btn ${isLikedByUser ? "liked" : ""}`}
          onClick={handleLikeToggle}
        >
          {isLikedByUser ? "Unlike" : "Like"} ({postLikes.length})
        </button>

        <button className="comment-btn" onClick={() => setShowComments(true)}>
          Comments
        </button>

        {isOwner && !isEditing && (
          <>
            <button className="edit-btn" onClick={() => setIsEditing(true)}>
              Edit
            </button>
            <button className="delete-btn" onClick={handleDelete}>
              Delete
            </button>
          </>
        )}
      </div>

      {/* Show Comments Modal */}
      {showComments && (
        // <CommentsModal post={post} onClose={() => setShowComments(false)} />
        <CommentsModalPortal
          post={post}
          onClose={() => setShowComments(false)}
        />
      )}
    </div>
  );
};
export default Post;

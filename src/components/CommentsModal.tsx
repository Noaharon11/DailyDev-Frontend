import React, { useEffect, useState } from "react";
import { IComment, IPost, IUser } from "../types";
import {
  fetchCommentsByPost,
  addComment,
  deleteComment,
} from "../services/comment-service";
import { fetchUserProfile } from "../services/user-service";
import Post from "./Post";
import "./CommentsModal.css";
import Comment from "./Comment";
import { useUser } from "../contexts/UserContext";

interface CommentsModalProps {
  post: IPost;
  onClose: () => void;
}

const CommentsModal: React.FC<CommentsModalProps> = ({ post, onClose }) => {
  const { currentUser } = useUser();
  const [comments, setComments] = useState<IComment[]>([]);
  const [commenters, setCommenters] = useState<Record<string, IUser>>({});
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(false);

  const loadComments = async () => {
    try {
      setLoading(true);
      const data = await fetchCommentsByPost(post._id);
      setComments(
        data.sort(
          (a, b) =>
            new Date(b.updatedAt || "").getTime() -
            new Date(a.updatedAt || "").getTime()
        )
      );

      // Load commenters' data
      const uniqueUserIds = [...new Set(data.map((c) => c.ownerId))];
      const userMap: Record<string, IUser> = {};
      await Promise.all(
        uniqueUserIds.map(async (userId) => {
          if (!commenters[userId]) {
            const user = await fetchUserProfile(userId);
            userMap[userId] = user;
          }
        })
      );
      setCommenters((prev) => ({ ...prev, ...userMap }));
    } catch (error) {
      console.error("Failed to load comments", error);
    } finally {
      setLoading(false);
    }
  };

  //   useEffect(() => {
  //     loadComments();
  //   }, [post._id]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const handleAddComment = async () => {
    if (!newComment.trim()) return;
    try {
      await addComment(post._id, newComment.trim());
      setNewComment("");
      loadComments();
    } catch (err) {
      console.error("Failed to add comment", err);
    }
  };

  const handleDelete = async (commentId: string) => {
    try {
      await deleteComment(commentId);
      loadComments();
    } catch (err) {
      console.error("Failed to delete comment", err);
    }
  };

  return (
    <div className="comments-modal-overlay">
      <div className="comments-modal">
        <button className="close-btn" onClick={onClose}>
          ×
        </button>
        <Post post={post} currentUser={currentUser} />

        <div className="add-comment-section">
          <input
            className="add-comment-input"
            placeholder="Write a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <button className="add-comment-btn" onClick={handleAddComment}>
            +
          </button>
        </div>

        <h4 className="comments-title">Comments</h4>
        {loading ? (
          <p>Loading comments...</p>
        ) : comments.length === 0 ? (
          <p className="no-comments">No comments yet.</p>
        ) : (
          <div className="comments-list">
            {comments.map((comment) => (
              <Comment
                key={comment._id}
                comment={comment}
                currentUser={currentUser}
                commenter={commenters[comment.ownerId]}
                onDelete={() => handleDelete(comment._id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentsModal;

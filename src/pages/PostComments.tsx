import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchPostById } from "../services/posts-service";
import { fetchCommentsByPost, addComment } from "../services/comment-service";
import { IPost, IComment } from "../types";
import "./PostComments.css";

const PostComments = () => {
  const { postId } = useParams();
  const [post, setPost] = useState<IPost | null>(null);
  const [comments, setComments] = useState<IComment[]>([]);
  const [loading, setLoading] = useState(true);
  const [newComment, setNewComment] = useState<string>("");

  useEffect(() => {
    const loadPostAndComments = async () => {
      try {
        if (!postId) return;

        // Fetch the post details
        const postDetails = await fetchPostById(postId);
        setPost(postDetails);

        // Fetch comments using the existing function
        const postComments = await fetchCommentsByPost(postId);
        setComments(postComments);
      } catch (error) {
        console.error("Error fetching post/comments:", error);
      } finally {
        setLoading(false);
      }
    };

    loadPostAndComments();
  }, [postId]);

  //  Handle adding a new comment
  const handleAddComment = async () => {
    if (!newComment.trim()) return;

    try {
      const addedComment = await addComment(postId!, newComment);
      setComments([...comments, addedComment]); //  Update state with the new comment
      setNewComment(""); //  Clear input field
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  return (
    <div className="comments-page">
      {loading ? (
        <p>Loading...</p>
      ) : post ? (
        <div className="post-comments-container">
          <h2>{post.content}</h2>
          {post.imageUrl && <img src={post.imageUrl} alt="Post" />}

          <h3>Comments:</h3>
          <div className="comments-list">
            {comments.length > 0 ? (
              comments.map((comment) => (
                <div key={comment._id} className="comment-box">
                  <p>💬 {comment.content}</p>
                  <span className="comment-author">
                    -{" "}
                    {typeof comment.ownerId === "string"
                      ? comment.ownerId
                      : comment.ownerId.username}
                  </span>
                </div>
              ))
            ) : (
              <p>No comments yet. Be the first to comment!</p>
            )}
          </div>

          <div className="add-comment">
            <input
              type="text"
              placeholder="Write a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <button onClick={handleAddComment}>Post</button>
          </div>
        </div>
      ) : (
        <p>Post not found.</p>
      )}
    </div>
  );
};

export default PostComments;

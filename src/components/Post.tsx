import React, { useState, useEffect } from "react";
import { IPost, IUser, IComment } from "../types";
import { useNavigate } from "react-router-dom";
//import { toggleLikePost } from "../services/posts-service";
import { fetchCommentsByPost } from "../services/comment-service";
import { fetchUserProfile } from "../services/user-service"; // 🛑 נוסיף קריאה לפרטי המשתמש
import "./Post.css";

interface PostProps {
  post: IPost;
  currentUser: IUser | null;
}

const Post: React.FC<PostProps> = ({ post, currentUser }) => {
  //const navigate = useNavigate();
  const { _id, author, content, imageUrl, likes } = post;
  const isOwner =
    currentUser?._id === (typeof author === "string" ? author : author._id);

  const [comments, setComments] = useState<IComment[]>([]);
  const [userDetails, setUserDetails] = useState<{ [key: string]: IUser }>({});

  useEffect(() => {
    const loadComments = async () => {
      try {
        const fetchedComments = await fetchCommentsByPost(_id);
        setComments(fetchedComments);

        // 🔥 Fetch user details for each comment owner
        const userFetches = fetchedComments.map(async (comment) => {
          if (!(comment.ownerId in userDetails)) {
            const user = await fetchUserProfile(comment.ownerId);
            return { [comment.ownerId]: user };
          }
          return null;
        });

        const usersArray = await Promise.all(userFetches);
        const usersObject = usersArray.reduce((acc, user) => {
          if (user) return { ...acc, ...user };
          return acc;
        }, {});

        setUserDetails((prev) => ({ ...prev, ...usersObject }));
      } catch (error) {
        console.error("Error loading comments:", error);
      }
    };

    loadComments();
  }, [_id]);

  return (
    <div className="post-container">
      {/* Post Content */}
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
        <h3 className="post-author">
          {typeof author === "string" ? author : author.username}
        </h3>
      </div>
      <p className="post-content">{content}</p>
      {imageUrl && <img src={imageUrl} alt="Post" className="post-image" />}
      <div className="post-actions">
        <button className="like-btn">❤️ {likes.length}</button>
        <button className="comment-btn">💬 Comment</button>
      </div>

      {/* Comments Section */}
      {comments.length > 0 && (
        <div className="comments-section">
          <h4>Comments:</h4>
          {comments.map((comment) => (
            <div key={comment._id} className="comment-box">
              <p>{comment.content}</p>
              <span className="comment-author">
                -{" "}
                {userDetails[comment.ownerId]
                  ? userDetails[comment.ownerId].username
                  : `User ID: ${comment.ownerId}`}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Post;

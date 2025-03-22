// import React, { useState, useEffect } from "react";
// import { IPost, IUser } from "../types";
// import {
//   toggleLikePost,
//   deletePost,
//   updatePost,
// } from "../services/posts-service";
// import { fetchUserProfile } from "../services/user-service";
// import { useNavigate } from "react-router-dom";
// import Alert from "./Alert";
// import "./Post.css";

// interface PostProps {
//   post: IPost;
//   currentUser: IUser | null;
// }

// const Post: React.FC<PostProps> = ({ post, currentUser }) => {
//   const { _id, content, imageUrl, createdAt, updatedAt } = post;
//   const navigate = useNavigate();

//   const [postAuthor, setPostAuthor] = useState<IUser | null>(null);
//   const [postLikes, setPostLikes] = useState<string[]>(
//     post.likes.map((like) => (typeof like === "string" ? like : like._id))
//   );
//   const [isEditing, setIsEditing] = useState(false);
//   const [editedContent, setEditedContent] = useState(content);
//   const [showComments, setShowComments] = useState(false);

//   const isOwner =
//     currentUser && post.author && typeof post.author === "string"
//       ? post.author === currentUser._id
//       : (post.author as IUser)?._id === currentUser?._id;

//   useEffect(() => {
//     const loadAuthor = async () => {
//       if (typeof post.author === "string") {
//         const user = await fetchUserProfile(post.author);
//         setPostAuthor(user);
//       } else {
//         setPostAuthor(post.author);
//       }
//     };

//     loadAuthor();
//   }, [post.author]);

//   const handleLike = async () => {
//     try {
//       const { likes } = await toggleLikePost(_id);
//       setPostLikes(
//         likes.map((like) => (typeof like === "string" ? like : like._id))
//       );
//     } catch {
//       Alert("Failed to like post", "error");
//     }
//   };

//   const handleDelete = async () => {
//     try {
//       await deletePost(_id);
//       Alert("Post deleted", "success");
//       window.location.reload(); // Optionally replace with state update
//     } catch {
//       Alert("Failed to delete post", "error");
//     }
//   };

//   const handleUpdate = async () => {
//     try {
//       await updatePost(_id, editedContent);
//       setIsEditing(false);
//       Alert("Post updated", "success");
//       window.location.reload(); // Optionally replace with state update
//     } catch {
//       Alert("Failed to update post", "error");
//     }
//   };

//   const formatDate = (dateStr?: string) => {
//     if (!dateStr) return null;
//     const date = new Date(dateStr);
//     return date.toLocaleString(); // Returns both date and time
//   };

//   return (
//     <div className="post-container">
//       <div className="post-header">
//         <img
//           className="post-avatar"
//           src={postAuthor?.imageUrl || "/src/assets/photo.png"}
//           alt="avatar"
//         />
//         <h3
//           className="post-author clickable"
//           onClick={() => navigate(`/profile/${postAuthor?._id}`)}
//         >
//           {postAuthor?.username || "Unknown"}
//         </h3>
//       </div>

//       <p className="post-date">
//         {updatedAt && updatedAt !== createdAt
//           ? `Updated: ${formatDate(updatedAt)}`
//           : `Posted: ${formatDate(createdAt)}`}
//       </p>

//       {isEditing ? (
//         <div className="edit-box">
//           <textarea
//             className="edit-textarea"
//             value={editedContent}
//             onChange={(e) => setEditedContent(e.target.value)}
//           />
//           <div className="edit-actions">
//             <button onClick={handleUpdate}>Save</button>
//             <button onClick={() => setIsEditing(false)}>Cancel</button>
//           </div>
//         </div>
//       ) : (
//         <>
//           <p className="post-content">{content}</p>
//           {imageUrl && <img src={imageUrl} className="post-image" alt="Post" />}
//         </>
//       )}

//       <div className="post-actions">
//         <button className="like-btn" onClick={handleLike}>
//           Like ({postLikes.length})
//         </button>
//         <button className="comment-btn" onClick={() => setShowComments(true)}>
//           Comments
//         </button>

//         {isOwner && !isEditing && (
//           <>
//             <button className="edit-btn" onClick={() => setIsEditing(true)}>
//               Edit
//             </button>
//             <button className="delete-btn" onClick={handleDelete}>
//               Delete
//             </button>
//           </>
//         )}
//       </div>

//       {showComments && (
//         <div className="comment-modal">
//           <div className="modal-content">
//             <h3>Comments for this post</h3>
//             <p>Coming soon...</p>
//             <button onClick={() => setShowComments(false)}>Close</button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Post;

import React, { useState } from "react";
import { IPost, IUser } from "../types";
import {
  likePost,
  unlikePost,
  deletePost,
  updatePost,
} from "../services/posts-service";
import { fetchUserProfile } from "../services/user-service";
import { useNavigate } from "react-router-dom";
import Alert from "./Alert";
import "./Post.css";

interface PostProps {
  post: IPost;
  currentUser: IUser | null;
}

const Post: React.FC<PostProps> = ({ post, currentUser }) => {
  const { _id, content, imageUrl, createdAt, updatedAt } = post;
  const navigate = useNavigate();

  const [postLikes, setPostLikes] = useState<string[]>(
    post.likes.map((like) => (typeof like === "string" ? like : like._id))
  );
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(content);
  const [showComments, setShowComments] = useState(false);

  // Check if current user is the post owner
  const isOwner =
    currentUser && post.owner && typeof post.owner === "string"
      ? post.owner === currentUser._id
      : (post.owner as IUser)?._id === currentUser?._id;

  // Check if current user already liked the post
  const isLikedByUser = currentUser
    ? postLikes.includes(currentUser._id)
    : false;

  // Fetch post author's profile
  // useEffect(() => {
  //   const loadAuthor = async () => {
  //     if (typeof post.author === "string") {
  //       const user = await fetchUserProfile(post.author);
  //       setPostAuthor(user);
  //     } else {
  //       setPostAuthor(post.author);
  //     }
  //   };

  //   loadAuthor();
  // }, [post.author]);

  // useEffect(() => {
  //   const loadAuthor = async () => {
  //     try {
  //       if (typeof post.author === "string") {
  //         console.log("🔍 Fetching author for ID:", post.author);
  //         const user = await fetchUserProfile(post.author);
  //         console.log("✅ Fetched user:", user);
  //         setPostAuthor(user);
  //       } else {
  //         console.log("Author is already a full object:", post.author);
  //         setPostAuthor(post.author);
  //       }
  //     } catch (error) {
  //       console.error("❌ Failed to fetch post author:", error);
  //     }
  //   };

  //   loadAuthor();
  // }, [post.author]);

  // useEffect(() => {
  //   const loadAuthor = async () => {
  //     if (typeof post.owner === "string") {
  //       const user = await fetchUserProfile(post.owner);
  //       setPostAuthor(user);
  //     } else {
  //       setPostAuthor(post.owner);
  //     }
  //   };
  //   loadAuthor();
  // }, [post.owner]);
  const postAuthor = post.owner as IUser;

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
    try {
      await deletePost(_id);
      Alert("Post deleted", "success");
      window.location.reload(); // Optional: trigger re-fetch from parent instead
    } catch {
      Alert("Failed to delete post", "error");
    }
  };

  const handleUpdate = async () => {
    try {
      await updatePost(_id, editedContent);
      setIsEditing(false);
      Alert("Post updated", "success");
      window.location.reload();
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
      <div className="post-header">
        <img
          className="post-avatar"
          src={postAuthor?.imageUrl || "/src/assets/photo.png"}
          alt="avatar"
        />
        <h3
          className="post-author clickable"
          onClick={() => navigate(`/profile/${postAuthor?._id}`)}
        >
          {postAuthor?.username || "Unknown"}
        </h3>
      </div>

      {/* Date shown in top-right corner */}
      <div className="post-date">
        {updatedAt && updatedAt !== createdAt
          ? formatDate(updatedAt)
          : formatDate(createdAt)}
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
          {imageUrl && <img src={imageUrl} className="post-image" alt="Post" />}
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

      {showComments && (
        <div className="comment-modal">
          <div className="modal-content">
            <h3>Comments for this post</h3>
            <p>Coming soon...</p>
            <button onClick={() => setShowComments(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Post;

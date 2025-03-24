// import React, { useState } from "react";
// import { IPost, IUser } from "../types";
// import {
//   likePost,
//   unlikePost,
//   deletePost,
//   updatePost,
//   fetchLikesForPost,
// } from "../services/posts-service";
// import { useNavigate } from "react-router-dom";
// import Alert, { ConfirmAlert } from "./Alert";
// import { useUser } from "../contexts/UserContext";
// import "./Post.css";
// import CommentsModalPortal from "./CommentsModalPortal";

// interface PostProps {
//   post: IPost;
//   currentUser?: IUser | null;
//   onPostChanged?: () => void;
// }

// const Post: React.FC<PostProps> = ({ post, onPostChanged }) => {
//   const { currentUser } = useUser();
//   const { _id, content, image, createdAt, updatedAt } = post;

//   const navigate = useNavigate();

//   const [postLikes, setPostLikes] = useState<string[]>(
//     post.likes.map((like) => (typeof like === "string" ? like : like._id))
//   );
//   const [isEditing, setIsEditing] = useState(false);
//   const [editedContent, setEditedContent] = useState(content);
//   const [showComments, setShowComments] = useState(false);
//   const [showLikes, setShowLikes] = useState(false);
//   const [likesList, setLikesList] = useState<IUser[]>([]);

//   const postAuthor = post.owner as IUser;
//   const isOwner = currentUser?._id === postAuthor?._id;
//   const isLikedByUser = currentUser
//     ? postLikes.includes(currentUser._id)
//     : false;

//   const handleLikeToggle = async () => {
//     if (!currentUser) return;
//     try {
//       if (isLikedByUser) {
//         await unlikePost(post._id, currentUser._id);
//         setPostLikes(postLikes.filter((id) => id !== currentUser._id));
//       } else {
//         await likePost(post._id, currentUser._id);
//         setPostLikes([...postLikes, currentUser._id]);
//       }
//     } catch {
//       Alert("Failed to toggle like", "error");
//     }
//   };

//   const handleDelete = async () => {
//     const confirm = await ConfirmAlert(
//       "Delete Post",
//       "Are you sure you want to delete this post?"
//     );
//     if (!confirm) return;

//     try {
//       await deletePost(_id);
//       Alert("Post deleted", "success");
//       onPostChanged?.();
//     } catch {
//       Alert("Failed to delete post", "error");
//     }
//   };

//   const handleUpdate = async () => {
//     const confirm = await ConfirmAlert(
//       "Save Changes",
//       "Are you sure you want to update this post?"
//     );
//     if (!confirm) return;

//     try {
//       await updatePost(_id, editedContent);
//       setIsEditing(false);
//       Alert("Post updated", "success");
//       onPostChanged?.();
//     } catch {
//       Alert("Failed to update post", "error");
//     }
//   };

//   const handleShowLikes = async () => {
//     try {
//       const users = await fetchLikesForPost(_id);
//       setLikesList(users);
//       setShowLikes(true);
//     } catch {
//       Alert("Failed to fetch likes", "error");
//     }
//   };

//   const formatDate = (dateStr?: string) => {
//     if (!dateStr) return "";
//     const date = new Date(dateStr);
//     return date.toLocaleDateString("en-GB") + ", " + date.toLocaleTimeString();
//   };

//   return (
//     <div className="post-container">
//       <div className="post-header-row">
//         <div className="post-header">
//           <img
//             className="post-avatar"
//             src={postAuthor?.profilePicture || "/src/assets/photo.png"}
//             alt="avatar"
//           />
//           <h3
//             className="post-author clickable"
//             onClick={() => navigate("/profile/" + postAuthor?._id)}
//           >
//             {postAuthor?.username || "Unknown"}
//           </h3>
//         </div>

//         <div className="post-meta">
//           <span className="post-date">
//             {updatedAt && updatedAt !== createdAt
//               ? formatDate(updatedAt)
//               : formatDate(createdAt)}
//           </span>
//         </div>
//       </div>

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
//           {image && <img src={image} className="post-image" alt="Post" />}
//         </>
//       )}

//       {/* כפתורי פעולה */}
//       <div className="post-actions">
//         <button
//           className={`like-btn ${isLikedByUser ? "liked" : ""}`}
//           onClick={handleLikeToggle}
//           onDoubleClick={handleShowLikes}
//         >
//           {isLikedByUser ? "Unlike" : "Like"} ({postLikes.length})
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

//       {/* Comments Modal */}
//       {showComments && (
//         <CommentsModalPortal
//           post={post}
//           onClose={() => setShowComments(false)}
//         />
//       )}

//       {/* Likes Modal */}
//       {showLikes && (
//         <div
//           className="likes-modal-overlay"
//           onClick={() => setShowLikes(false)}
//         >
//           <div className="likes-modal" onClick={(e) => e.stopPropagation()}>
//             <h3>Liked by:</h3>
//             <ul>
//               {likesList.map((user) => (
//                 <li key={user._id} className="like-user">
//                   <img
//                     src={user.profilePicture || "/src/assets/photo.png"}
//                     alt="avatar"
//                     className="like-user-avatar"
//                   />
//                   <span>{user.username}</span>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };
// export default Post;

//*****************************************

// import { useState } from "react";
// import { IPost, IUser } from "../types";
// import {
//   likePost,
//   unlikePost,
//   deletePost,
//   updatePost,
//   fetchLikesForPost,
// } from "../services/posts-service";
// import { useNavigate } from "react-router-dom";
// import Alert, { ConfirmAlert } from "./Alert";
// import { useUser } from "../contexts/UserContext";
// import "./Post.css";
// import CommentsModalPortal from "./CommentsModalPortal";

// interface PostProps {
//   post: IPost;
//   currentUser?: IUser | null;
//   onPostChanged?: () => void;
// }

// const Post: React.FC<PostProps> = ({ post, onPostChanged }) => {
//   const { currentUser } = useUser();
//   const { _id, content, image, createdAt, updatedAt } = post;
//   const navigate = useNavigate();

//   const [postLikes, setPostLikes] = useState<string[]>(
//     post.likes.map((like) => (typeof like === "string" ? like : like._id))
//   );
//   const [isEditing, setIsEditing] = useState(false);
//   const [editedContent, setEditedContent] = useState(content);
//   const [editedImage, setEditedImage] = useState<File | null>(null);
//   const [previewImage, setPreviewImage] = useState(image || "");
//   const [showComments, setShowComments] = useState(false);
//   const [showLikes, setShowLikes] = useState(false);
//   const [likesList, setLikesList] = useState<IUser[]>([]);

//   const postAuthor = post.owner as IUser;
//   const isOwner = currentUser?._id === postAuthor?._id;
//   const isLikedByUser = currentUser
//     ? postLikes.includes(currentUser._id)
//     : false;

//   const handleLikeToggle = async () => {
//     if (!currentUser) return;
//     try {
//       if (isLikedByUser) {
//         await unlikePost(_id, currentUser._id);
//         setPostLikes(postLikes.filter((id) => id !== currentUser._id));
//       } else {
//         await likePost(_id, currentUser._id);
//         setPostLikes([...postLikes, currentUser._id]);
//       }
//     } catch {
//       Alert("Failed to toggle like", "error");
//     }
//   };

//   const handleDelete = async () => {
//     const confirm = await ConfirmAlert(
//       "Delete Post",
//       "Are you sure you want to delete this post?"
//     );
//     if (!confirm) return;

//     try {
//       await deletePost(_id);
//       Alert("Post deleted", "success");
//       onPostChanged?.();
//     } catch {
//       Alert("Failed to delete post", "error");
//     }
//   };

//   const handleUpdate = async () => {
//     const confirm = await ConfirmAlert(
//       "Save Changes",
//       "Are you sure you want to update this post?"
//     );
//     if (!confirm) return;

//     try {
//       let imageUrl = image;
//       if (editedImage) {
//         const formData = new FormData();
//         formData.append("file", editedImage);
//         const res = await fetch("/files", { method: "POST", body: formData });
//         const data = await res.json();
//         imageUrl = data.url;
//       }
//       await updatePost(_id, editedContent, imageUrl, currentUser?._id);
//       setIsEditing(false);
//       Alert("Post updated", "success");
//       onPostChanged?.();
//     } catch {
//       Alert("Failed to update post", "error");
//     }
//   };

//   const handleShowLikes = async () => {
//     try {
//       const users = await fetchLikesForPost(_id);
//       setLikesList(users);
//       setShowLikes(true);
//     } catch {
//       Alert("Failed to fetch likes", "error");
//     }
//   };

//   const formatDate = (dateStr?: string) => {
//     if (!dateStr) return "";
//     const date = new Date(dateStr);
//     return date.toLocaleDateString("en-GB") + ", " + date.toLocaleTimeString();
//   };

//   return (
//     <div className="post-container">
//       <div className="post-header-row">
//         <div className="post-header">
//           <img
//             className="post-avatar"
//             src={postAuthor?.profilePicture || "/src/assets/photo.png"}
//             alt="avatar"
//           />
//           <div>
//             <div
//               className="post-username"
//               onClick={() => navigate("/profile/" + postAuthor?._id)}
//             >
//               {postAuthor?.username || "Unknown"}
//             </div>
//             <div className="post-date">
//               {updatedAt && updatedAt !== createdAt
//                 ? formatDate(updatedAt)
//                 : formatDate(createdAt)}
//             </div>
//           </div>
//         </div>
//         {isOwner && !isEditing && (
//           <div className="post-actions-top">
//             <button className="delete-btn" onClick={handleDelete}>
//               🗑️
//             </button>
//           </div>
//         )}
//       </div>

//       {isEditing ? (
//         <div className="edit-box">
//           <textarea
//             className="edit-textarea"
//             value={editedContent}
//             onChange={(e) => setEditedContent(e.target.value)}
//           />
//           <div className="edit-image-actions">
//             <input
//               type="file"
//               accept="image/*"
//               onChange={(e) => {
//                 const file = e.target.files?.[0];
//                 if (file) {
//                   setEditedImage(file);
//                   setPreviewImage(URL.createObjectURL(file));
//                 }
//               }}
//             />
//             <button
//               className="delete-btn"
//               onClick={() => {
//                 setEditedImage(null);
//                 setPreviewImage("");
//               }}
//             >
//               Remove Image
//             </button>
//           </div>
//           {previewImage && (
//             <img src={previewImage} className="post-image" alt="Preview" />
//           )}
//           <div className="edit-actions">
//             <button className="post-button" onClick={handleUpdate}>
//               Save
//             </button>
//             <button className="post-button" onClick={() => setIsEditing(false)}>
//               Cancel
//             </button>
//           </div>
//         </div>
//       ) : (
//         <>
//           <p className="post-content">{content}</p>
//           {image && <img src={image} className="post-image" alt="Post" />}
//         </>
//       )}

//       <div className="post-buttons">
//         <button
//           className={`post-button ${isLikedByUser ? "liked" : ""}`}
//           onClick={handleLikeToggle}
//           onDoubleClick={handleShowLikes}
//         >
//           {isLikedByUser ? "Unlike" : "Like"}
//         </button>

//         <button className="post-button" onClick={() => setShowComments(true)}>
//           Comments
//         </button>

//         {isOwner && !isEditing && (
//           <button className="post-button" onClick={() => setIsEditing(true)}>
//             Edit
//           </button>
//         )}
//       </div>

//       {showComments && (
//         <div className="modal-overlay" onClick={() => setShowComments(false)}>
//           <div className="modal-content" onClick={(e) => e.stopPropagation()}>
//             <CommentsModalPortal
//               post={post}
//               onClose={() => setShowComments(false)}
//             />
//           </div>
//         </div>
//       )}

//       {showLikes && (
//         <div className="modal-overlay" onClick={() => setShowLikes(false)}>
//           <div className="modal-content" onClick={(e) => e.stopPropagation()}>
//             <h3>Liked by:</h3>
//             <ul className="like-user-list">
//               {likesList.map((user) => (
//                 <li key={user._id} className="like-user">
//                   <img
//                     src={user.profilePicture || "/src/assets/photo.png"}
//                     alt="avatar"
//                     className="like-user-avatar"
//                   />
//                   <span>{user.username}</span>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };
// export default Post;

import { useState } from "react";
import { IPost, IUser } from "../types";
import {
  likePost,
  unlikePost,
  deletePost,
  updatePost,
  fetchLikesForPost,
} from "../services/posts-service";
import { useNavigate } from "react-router-dom";
import Alert, { ConfirmAlert } from "./Alert";
import { useUser } from "../contexts/UserContext";
import "./Post.css";
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

  const [postLikes, setPostLikes] = useState<string[]>(
    post.likes.map((like) => (typeof like === "string" ? like : like._id))
  );
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(content);
  const [editedImage, setEditedImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState(image || "");
  const [showComments, setShowComments] = useState(false);
  const [showLikes, setShowLikes] = useState(false);
  const [likesList, setLikesList] = useState<IUser[]>([]);

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
      let imageUrl = image;
      if (editedImage) {
        const formData = new FormData();
        formData.append("file", editedImage);
        const res = await fetch("/files", { method: "POST", body: formData });
        const data = await res.json();
        imageUrl = `${import.meta.env.VITE_SERVER_URL}/${data.url}`;
      }
      await updatePost(_id, editedContent, imageUrl);
      setIsEditing(false);
      Alert("Post updated", "success");
      onPostChanged?.();
    } catch {
      Alert("Failed to update post", "error");
    }
  };

  const handleShowLikes = async () => {
    try {
      const users = await fetchLikesForPost(_id);
      setLikesList(users);
      setShowLikes(true);
    } catch {
      Alert("Failed to fetch likes", "error");
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
          <div>
            <div
              className="post-username"
              onClick={() => navigate("/profile/" + postAuthor?._id)}
            >
              {postAuthor?.username || "Unknown"}
            </div>
            <div className="post-date">
              {updatedAt && updatedAt !== createdAt
                ? formatDate(updatedAt)
                : formatDate(createdAt)}
            </div>
          </div>
        </div>
      </div>

      {isEditing ? (
        <div className="edit-box">
          <textarea
            className="edit-textarea"
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
          />
          <div className="edit-image-actions">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  setEditedImage(file);
                  setPreviewImage(URL.createObjectURL(file));
                }
              }}
            />
            <button
              className="post-button delete-btn"
              onClick={() => {
                setEditedImage(null);
                setPreviewImage("");
              }}
            >
              Remove Image
            </button>
          </div>
          {previewImage && (
            <img src={previewImage} className="post-image" alt="Preview" />
          )}
          <div className="edit-actions">
            <button className="post-button" onClick={handleUpdate}>
              Save
            </button>
            <button className="post-button" onClick={() => setIsEditing(false)}>
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <>
          <p className="post-content">{content}</p>
          {image && <img src={image} className="post-image" alt="Post" />}
        </>
      )}

      <div className="post-buttons">
        <button
          className={`post-button ${isLikedByUser ? "liked" : ""}`}
          onClick={handleLikeToggle}
          onDoubleClick={handleShowLikes}
        >
          {isLikedByUser ? "Unlike" : "Like"}
        </button>

        <button className="post-button" onClick={() => setShowComments(true)}>
          Comments
        </button>

        {isOwner && !isEditing && (
          <>
            <button className="post-button" onClick={handleDelete}>
              Delete
            </button>
            <button className="post-button" onClick={() => setIsEditing(true)}>
              Edit
            </button>
          </>
        )}

        {postLikes.length > 0 && (
          <button className="post-button" onClick={handleShowLikes}>
            View Likes
          </button>
        )}
      </div>

      {showComments && (
        <div className="modal-overlay" onClick={() => setShowComments(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <CommentsModalPortal
              post={post}
              onClose={() => setShowComments(false)}
            />
          </div>
        </div>
      )}

      {showLikes && (
        <div className="modal-overlay" onClick={() => setShowLikes(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>Liked by:</h3>
            <ul className="like-user-list">
              {likesList.map((user) => (
                <li key={user._id} className="like-user">
                  <img
                    src={user.profilePicture || "/src/assets/photo.png"}
                    alt="avatar"
                    className="like-user-avatar"
                  />
                  <span>{user.username}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};
export default Post;

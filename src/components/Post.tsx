// import React, { useState, useEffect, ChangeEvent } from "react";
// import { IPost, IUser, IComment } from "../types";
// import { useNavigate } from "react-router-dom";
// import { fetchCommentsByPost, addComment } from "../services/comment-service";
// import { fetchUserProfile } from "../services/user-service";
// import { toggleLikePost, createPost } from "../services/posts-service";
// import Alert from "../components/Alert";
// import "./Post.css";

// interface PostProps {
//   post: IPost;
//   currentUser: IUser | null;
// }

// const Post: React.FC<PostProps> = ({ post, currentUser }) => {
//   //const navigate = useNavigate();
//   const { _id, author, content, imageUrl, likes } = post;
//   const isOwner =
//     currentUser?._id === (typeof author === "string" ? author : author._id);

//   const [comments, setComments] = useState<IComment[]>([]);
//   const [userDetails, setUserDetails] = useState<{ [key: string]: IUser }>({});
//   const [newContent, setNewContent] = useState("");
//   const [newImage, setNewImage] = useState<File | null>(null);

//   useEffect(() => {
//     const loadComments = async () => {
//       try {
//         const fetchedComments = await fetchCommentsByPost(_id);
//         setComments(fetchedComments);

//         const userFetches = fetchedComments.map(async (comment) => {
//           if (!(comment.ownerId in userDetails)) {
//             const user = await fetchUserProfile(comment.ownerId);
//             return { [comment.ownerId]: user };
//           }
//           return null;
//         });

//         const usersArray = await Promise.all(userFetches);
//         const usersObject = usersArray.reduce((acc, user) => {
//           if (user) return { ...acc, ...user };
//           return acc;
//         }, {});

//         setUserDetails((prev) => ({ ...prev, ...usersObject }));
//       } catch (error) {
//         console.error("Error loading comments:", error);
//       }
//     };

//     loadComments();
//   }, [_id]);

//   const handleLike = async () => {
//     try {
//       const { likes } = await toggleLikePost(_id);
//     } catch {
//       Alert("Failed to like post", "error");
//     }
//   };

//   const handlePostSubmit = async () => {
//     if (!newContent.trim()) {
//       Alert("Content is required", "error");
//       return;
//     }

//     try {
//       await createPost(newContent, newImage || undefined);
//       Alert("Post created!", "success");
//       setNewContent("");
//       setNewImage(null);
//       // תעדכני את הריענון כאן אם צריך להביא מחדש את הפוסטים
//     } catch {
//       Alert("Failed to create post", "error");
//     }
//   };

//   return (
//     <div className="post-container">
//       {/* Post Content */}
//       <div className="post-header">
//         <img
//           src={
//             typeof author === "string"
//               ? "/default-avatar.png"
//               : author.imageUrl || "/default-avatar.png"
//           }
//           alt="User"
//           className="post-avatar"
//         />
//         <h3 className="post-author">
//           {typeof author === "string" ? author : author.username}
//         </h3>
//       </div>
//       <p className="post-content">{content}</p>
//       {imageUrl && <img src={imageUrl} alt="Post" className="post-image" />}

//       <div className="post-actions">
//         <button className="like-btn" onClick={handleLike}>
//           ❤️ {likes.length}
//         </button>
//         <button className="comment-btn">💬 Comment</button>
//       </div>

//       {/* Comments Section */}
//       {comments.length > 0 && (
//         <div className="comments-section">
//           <h4>Comments:</h4>
//           {comments.map((comment) => (
//             <div key={comment._id} className="comment-box">
//               <p>{comment.content}</p>
//               <span className="comment-author">
//                 -{" "}
//                 {userDetails[comment.ownerId]?.username ||
//                   `User ID: ${comment.ownerId}`}
//               </span>
//             </div>
//           ))}
//         </div>
//       )}

//       {/* New Post Section (optional upload) */}
//       {currentUser && (
//         <div className="new-post-section">
//           <h4>Create a new post</h4>
//           <textarea
//             value={newContent}
//             onChange={(e) => setNewContent(e.target.value)}
//             placeholder="What's on your mind?"
//           />
//           <input
//             type="file"
//             accept="image/*"
//             onChange={(e: ChangeEvent<HTMLInputElement>) => {
//               if (e.target.files && e.target.files.length > 0) {
//                 setNewImage(e.target.files[0]);
//               }
//             }}
//           />
//           <button onClick={handlePostSubmit}>Post</button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Post;

// import React, { useState, useEffect, ChangeEvent } from "react";
// import { IPost, IUser, IComment } from "../types";
// //import { useNavigate } from "react-router-dom";
// import { fetchCommentsByPost } from "../services/comment-service";
// import { fetchUserProfile } from "../services/user-service";
// import { toggleLikePost, createPost } from "../services/posts-service";
// import Alert from "../components/Alert";
// import "./Post.css";

// interface PostProps {
//   post: IPost;
//   currentUser: IUser | null;
// }

// const Post: React.FC<PostProps> = ({ post, currentUser }) => {
//   //const navigate = useNavigate();
//   const { _id, author, content, imageUrl } = post;
//   // const isOwner =
//   //   currentUser?._id === (typeof author === "string" ? author : author._id);

//   const [postLikes, setPostLikes] = useState<string[]>(
//     post.likes.map((like) => (typeof like === "string" ? like : like._id))
//   );
//   const [comments, setComments] = useState<IComment[]>([]);
//   const [userDetails, setUserDetails] = useState<{ [key: string]: IUser }>({});
//   const [newContent, setNewContent] = useState("");
//   const [newImage, setNewImage] = useState<File | null>(null);

//   useEffect(() => {
//     const loadComments = async () => {
//       try {
//         const fetchedComments = await fetchCommentsByPost(_id);
//         setComments(fetchedComments);

//         const userFetches = fetchedComments.map(async (comment) => {
//           if (!(comment.ownerId in userDetails)) {
//             const user = await fetchUserProfile(comment.ownerId);
//             return { [comment.ownerId]: user };
//           }
//           return null;
//         });

//         const usersArray = await Promise.all(userFetches);
//         const usersObject = usersArray.reduce((acc, user) => {
//           if (user) return { ...acc, ...user };
//           return acc;
//         }, {});

//         setUserDetails((prev) => ({ ...prev, ...usersObject }));
//       } catch (error) {
//         console.error("Error loading comments:", error);
//       }
//     };

//     loadComments();
//   }, [_id]);

//   const handleLike = async () => {
//     try {
//       const { likes } = await toggleLikePost(_id);
//       const updatedLikes = likes.map((like) =>
//         typeof like === "string" ? like : like._id
//       );
//       setPostLikes(updatedLikes);
//     } catch {
//       Alert("Failed to like post", "error");
//     }
//   };

//   const handlePostSubmit = async () => {
//     if (!newContent.trim()) {
//       Alert("Content is required", "error");
//       return;
//     }

//     try {
//       await createPost(newContent, newImage || undefined);
//       Alert("Post created!", "success");
//       setNewContent("");
//       setNewImage(null);
//     } catch {
//       Alert("Failed to create post", "error");
//     }
//   };

//   return (
//     <div className="post-container">
//       {/* Post Content */}
//       <div className="post-header">
//         <img
//           src={
//             typeof author === "string"
//               ? "/default-avatar.png"
//               : author.imageUrl || "/default-avatar.png"
//           }
//           alt="User"
//           className="post-avatar"
//         />
//         <h3 className="post-author">
//           {typeof author === "string" ? author : author.username}
//         </h3>
//       </div>
//       <p className="post-content">{content}</p>
//       {imageUrl && <img src={imageUrl} alt="Post" className="post-image" />}

//       <div className="post-actions">
//         <button className="like-btn" onClick={handleLike}>
//           ❤️ {postLikes.length}
//         </button>
//         <button className="comment-btn">💬 Comment</button>
//       </div>

//       {/* Comments Section */}
//       {comments.length > 0 && (
//         <div className="comments-section">
//           <h4>Comments:</h4>
//           {comments.map((comment) => (
//             <div key={comment._id} className="comment-box">
//               <p>{comment.content}</p>
//               <span className="comment-author">
//                 -{" "}
//                 {userDetails[comment.ownerId]?.username ||
//                   `User ID: ${comment.ownerId}`}
//               </span>
//             </div>
//           ))}
//         </div>
//       )}

//       {/* New Post Section (optional upload) */}
//       {currentUser && (
//         <div className="new-post-section">
//           <h4>Create a new post</h4>
//           <textarea
//             value={newContent}
//             onChange={(e) => setNewContent(e.target.value)}
//             placeholder="What's on your mind?"
//           />
//           <input
//             type="file"
//             accept="image/*"
//             onChange={(e: ChangeEvent<HTMLInputElement>) => {
//               if (e.target.files && e.target.files.length > 0) {
//                 setNewImage(e.target.files[0]);
//               }
//             }}
//           />
//           <button onClick={handlePostSubmit}>Post</button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Post;

import React, { useState, useEffect } from "react";
import { IPost, IUser, IComment } from "../types";
import { fetchCommentsByPost } from "../services/comment-service";
import { fetchUserProfile } from "../services/user-service";
import { toggleLikePost } from "../services/posts-service";
import Alert from "../components/Alert";
import "./Post.css";

interface PostProps {
  post: IPost;
  currentUser: IUser | null;
}

const Post: React.FC<PostProps> = ({ post, currentUser }) => {
  const { _id, author, content, imageUrl } = post;

  // נבדוק האם המשתמש המחובר הוא זה שפרסם את הפוסט
  const isOwner =
    currentUser?._id === (typeof author === "string" ? author : author?._id);

  const [postLikes, setPostLikes] = useState<string[]>(
    post.likes.map((like) => (typeof like === "string" ? like : like._id))
  );
  const [comments, setComments] = useState<IComment[]>([]);
  const [userDetails, setUserDetails] = useState<{ [key: string]: IUser }>({});

  useEffect(() => {
    const loadComments = async () => {
      try {
        const fetchedComments = await fetchCommentsByPost(_id);
        setComments(fetchedComments);

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

  const handleLike = async () => {
    try {
      const { likes } = await toggleLikePost(_id);
      const updatedLikes = likes.map((like) =>
        typeof like === "string" ? like : like._id
      );
      setPostLikes(updatedLikes);
    } catch {
      Alert("Failed to like post", "error");
    }
  };

  return (
    <div className="post-container">
      <div className="post-header">
        <img
          src={
            typeof author === "string"
              ? "/src/assets/photo.png"
              : author?.imageUrl || "/default-avatar.png"
          }
          alt="User"
          className="post-avatar"
        />
        <h3 className="post-author">
          {typeof author === "string" ? author : author?.username || "Unknown"}
        </h3>
      </div>

      <p className="post-content">{content}</p>
      {imageUrl && <img src={imageUrl} alt="Post" className="post-image" />}

      <div className="post-actions">
        <button className="like-btn" onClick={handleLike}>
          ❤️ {postLikes.length}
        </button>
        <button className="comment-btn">💬 Comment</button>

        {isOwner && (
          <button
            className="edit-btn"
            onClick={() => Alert("Edit clicked!", "info")}
          >
            ✏️ Edit
          </button>
        )}
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
                {userDetails[comment.ownerId]?.username ||
                  `User ID: ${comment.ownerId}`}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Post;

// import React, { useState } from "react";
// import { createPost } from "../services/posts-service";
// import { useUser } from "../contexts/UserContext";
// import "./CreatePost.css";

// const CreatePost: React.FC = () => {
//   const { currentUser } = useUser();
//   const [content, setContent] = useState("");
//   const [error, setError] = useState("");

//   // Handle post submission
//   const handlePost = async () => {
//     if (!content.trim()) {
//       setError("Post content cannot be empty.");
//       return;
//     }

//     try {
//       // Send post content as a string (not an object)
//       await createPost(content);
//       setContent("");
//       setError("");
//       window.location.reload(); // Optional: replace with post re-fetch
//     } catch (err) {
//       console.error("Failed to create post", err);
//       setError("Something went wrong. Please try again.");
//     }
//   };

//   // If user is not authenticated, hide post box
//   if (!currentUser) return null;

//   return (
//     <div className="create-post">
//       <textarea
//         className="create-post-textarea"
//         value={content}
//         onChange={(e) => setContent(e.target.value)}
//         placeholder="What's on your mind?"
//         rows={4}
//       />
//       {error && <p className="error-msg">{error}</p>}
//       <button className="create-post-btn" onClick={handlePost}>
//         Post
//       </button>
//     </div>
//   );
// };

// export default CreatePost;

import React, { useState } from "react";
import { createPost } from "../services/posts-service";
import { useUser } from "../contexts/UserContext";
import "./CreatePost.css";

interface CreatePostProps {
  onPostCreated?: () => void;
}

const CreatePost: React.FC<CreatePostProps> = ({ onPostCreated }) => {
  const { currentUser } = useUser();
  const [content, setContent] = useState("");
  const [error, setError] = useState("");

  const handlePost = async () => {
    if (!content.trim()) {
      setError("Post content cannot be empty.");
      return;
    }

    try {
      await createPost(content);
      setContent("");
      setError("");
      onPostCreated?.(); // Trigger parent refresh
    } catch (err) {
      console.error("Failed to create post", err);
      setError("Something went wrong. Please try again.");
    }
  };

  if (!currentUser) return null;

  return (
    <div className="create-post">
      <textarea
        className="create-post-textarea"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="What's on your mind?"
        rows={4}
      />
      {error && <p className="error-msg">{error}</p>}
      <button className="create-post-btn" onClick={handlePost}>
        Post
      </button>
    </div>
  );
};

export default CreatePost;

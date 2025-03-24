// import React, { useState } from "react";
// import { createPost } from "../services/posts-service";
// import { useUser } from "../contexts/UserContext";
// import { uploadFile } from "../services/file-service";
// import "./CreatePost.css";

// interface CreatePostProps {
//   onPostCreated?: () => void;
// }

// const CreatePost: React.FC<CreatePostProps> = ({ onPostCreated }) => {
//   const { currentUser } = useUser();
//   const [content, setContent] = useState("");
//   const [error, setError] = useState("");
//   const [imageFile, setImageFile] = useState<File | null>(null);
//   const [imagePreview, setImagePreview] = useState<string | null>(null);
//   //const fileInputRef = useRef<HTMLInputElement>(null);

//   const handlePost = async () => {
//     if (!content.trim()) {
//       setError("Post content cannot be empty.");
//       return;
//     }

//     try {
//       let imageUrl: string | undefined;

//       if (imageFile) {
//         imageUrl = await uploadFile(imageFile);
//       }
//       //   await createPost(content, imageUrl);
//       await createPost(content, imageUrl);

//       setContent("");
//       setImageFile(null);
//       setImagePreview(null);
//       setError("");
//       onPostCreated?.(); // Trigger parent refresh
//     } catch (err) {
//       console.error("Failed to create post", err);
//       setError("Something went wrong. Please try again.");
//     }
//   };

//   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       setImageFile(file);
//       setImagePreview(URL.createObjectURL(file));
//     }
//   };

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

//       {imagePreview && (
//         <img
//           src={imagePreview}
//           alt="Preview"
//           className="create-post-image-preview"
//         />
//       )}

//       <input
//         type="file"
//         accept="image/*"
//         onChange={handleImageChange}
//         className="create-post-file-input"
//       />

//       {error && <p className="error-msg">{error}</p>}

//       <button className="create-post-btn" onClick={handlePost}>
//         Post
//       </button>
//     </div>
//   );
// };

// export default CreatePost;

import React, { useState, useRef } from "react";
import { createPost } from "../services/posts-service";
import { useUser } from "../contexts/UserContext";
import { uploadFile } from "../services/file-service";
import "./CreatePost.css";

interface CreatePostProps {
  onPostCreated?: () => void;
}

const CreatePost: React.FC<CreatePostProps> = ({ onPostCreated }) => {
  const { currentUser } = useUser();
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handlePost = async () => {
    if (!content.trim()) {
      setError("Post content cannot be empty.");
      return;
    }

    try {
      let image: string | undefined;

      if (imageFile) {
        image = await uploadFile(imageFile); // returns full URL
      }

      await createPost(content, image); // 'image' matches the backend model field

      // Reset all fields
      setContent("");
      setImageFile(null);
      setImagePreview(null);
      fileInputRef.current!.value = "";
      setError("");
      onPostCreated?.();
    } catch (err) {
      console.error("Failed to create post", err);
      setError("Something went wrong. Please try again.");
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
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

      {imagePreview && (
        <img
          src={imagePreview}
          alt="Preview"
          className="create-post-image-preview"
        />
      )}

      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="create-post-file-input"
        ref={fileInputRef}
      />

      {error && <p className="error-msg">{error}</p>}

      <button className="create-post-btn" onClick={handlePost}>
        Post
      </button>
    </div>
  );
};

export default CreatePost;

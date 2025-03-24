// import React from "react";
// import { IComment, IUser } from "../types";
// import "./Comment.css";

// interface CommentProps {
//   comment: IComment;
//   currentUser: IUser | null;
//   commenter: IUser | null;
//   onDelete: (commentId: string) => void;
// }

// const Comment: React.FC<CommentProps> = ({
//   comment,
//   currentUser,
//   commenter,
//   onDelete,
// }) => {
//   const isOwner = currentUser?._id === comment.ownerId;

//   return (
//     <div className="comment-container">
//       <div className="comment-header">
//         <img
//           src={commenter?.profilePicture || "/src/assets/photo.png"}
//           alt="avatar"
//           className="comment-avatar"
//         />
//         <div className="comment-meta">
//           <span className="comment-username">
//             {commenter?.username || "User"}
//           </span>
//           <span className="comment-date">
//             {new Date(comment.updatedAt || comment.createdAt!).toLocaleString()}
//           </span>
//         </div>

//         {isOwner && (
//           <button
//             className="delete-btn"
//             title="Delete comment"
//             onClick={() => onDelete(comment._id)}
//           >
//             🗑️
//           </button>
//         )}
//       </div>

//       <p className="comment-text">{comment.content}</p>
//     </div>
//   );
// };

// export default Comment;

import React from "react";
import { IComment, IUser } from "../types";
import "./Comment.css";

interface CommentProps {
  comment: IComment;
  currentUser: IUser | null;
  onDelete: (commentId: string) => void;
}

const Comment: React.FC<CommentProps> = ({
  comment,
  currentUser,
  onDelete,
}) => {
  const isOwner = currentUser?._id === comment.owner._id;

  return (
    <div className="comment-container">
      <div className="comment-header">
        <img
          src={comment.owner.avatar || "/src/assets/photo.png"}
          alt="avatar"
          className="comment-avatar"
        />
        <div className="comment-meta">
          <span className="comment-username">{comment.owner.username}</span>
          <span className="comment-date">
            {new Date(comment.updatedAt || comment.createdAt!).toLocaleString()}
          </span>
        </div>

        {isOwner && (
          <button
            className="delete-btn"
            title="Delete comment"
            onClick={() => onDelete(comment._id)}
          >
            🗑️
          </button>
        )}
      </div>

      <p className="comment-text">{comment.comment}</p>
    </div>
  );
};

export default Comment;

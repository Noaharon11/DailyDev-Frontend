import { IComment } from "../types";
import "./Comment.css";

interface CommentProps extends IComment {
  onDelete?: () => void;
}

function Comment({ username, text, onDelete }: CommentProps) {
  return (
    <div className="comment-container">
      <strong>{username}</strong>
      <p>{text}</p>
      {onDelete && (
        <button className="btn-delete" onClick={onDelete}>
          🗑️ Delete
        </button>
      )}
    </div>
  );
}

export default Comment;

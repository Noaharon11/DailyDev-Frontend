import { IComment } from "../types";

function Comment({ owner, content }: IComment) {
  return (
    <div className="comment">
      <p>
        <strong>{owner}:</strong> {content}
      </p>
    </div>
  );
}

export default Comment;

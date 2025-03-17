// import { IPost } from "../types";
// import "./Post.css";

// interface PostProps extends IPost {
//   onLike: () => void;
//   onComment: () => void;
// }

// function Post({
//   username,
//   text,
//   imgUrl,
//   likes,
//   comments,
//   onLike,
//   onComment,
// }: PostProps) {
//   return (
//     <div className="post-container">
//       <div className="post-header">
//         <h3>{username}</h3>
//       </div>

//       {imgUrl && <img src={imgUrl} alt="Post" className="post-image" />}

//       <p className="post-text">{text}</p>

//       <div className="post-actions">
//         <button className="btn btn-like" onClick={onLike}>
//           ❤️ {likes}
//         </button>
//         <button className="btn btn-comment" onClick={onComment}>
//           💬 {comments.length} Comments
//         </button>
//       </div>
//     </div>
//   );
// }

// export default Post;

import { Link } from "react-router-dom";
import { IPost } from "../types";
import "./Post.css";

interface PostProps extends IPost {
  onLike: () => void;
  onComment: () => void;
}

function Post({
  id,
  username,
  text,
  imgUrl,
  likes,
  comments,
  onLike,
  onComment,
}: PostProps) {
  return (
    <div className="post-container">
      <div className="post-header">
        <img
          src={`https://api.dicebear.com/7.x/bottts/svg?seed=${username}`}
          alt="Profile"
          className="profile-pic"
        />
        <Link to={`/profile/${id}`} className="post-username">
          {username}
        </Link>
      </div>

      {imgUrl && <img src={imgUrl} alt="Post" className="post-image" />}

      <p className="post-text">{text}</p>

      <div className="post-actions">
        <button className="btn btn-like" onClick={onLike}>
          ❤️ {likes}
        </button>
        <button className="btn btn-comment" onClick={onComment}>
          💬 {comments.length} Comments
        </button>
      </div>
    </div>
  );
}

export default Post;

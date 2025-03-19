import { useEffect, useState } from "react";
import { IPost, IComment } from "../types";
import { fetchCommentsByPost } from "../services/comment-service";
import { Link } from "react-router-dom";

interface PostProps extends IPost {
  onLike: () => void;
}

function Post({ _id, owner, content, likes, createdAt, onLike }: PostProps) {
  const [comments, setComments] = useState<IComment[]>([]);
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [isLiked, setIsLiked] = useState(false);
  const [user] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  useEffect(() => {
    if (showComments) {
      const loadComments = async () => {
        const fetchedComments = await fetchCommentsByPost(_id);
        setComments(fetchedComments);
      };
      loadComments();
    }
  }, [showComments, _id]);

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      const response = await fetch(`/api/posts/${_id}/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content: newComment }),
      });

      if (!response.ok) throw new Error();

      const comment = await response.json();
      setComments((prev) => [...prev, comment]);
      setNewComment("");
    } catch (error) {
      console.error("Failed to post comment:", error);
    }
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
    onLike();
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const now = new Date();
    const diff = now.getTime() - date.getTime();

    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (minutes < 1) return "Just now";
    if (minutes < 60) return `${minutes}m`;
    if (hours < 24) return `${hours}h`;
    if (days < 7) return `${days}d`;

    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="bg-white rounded-lg shadow">
      {/* Post Header */}
      <div className="p-4">
        <div className="flex items-center justify-between">
          <Link
            to={`/profile/${owner}`}
            className="flex items-center space-x-3"
          >
            <img
              src="https://via.placeholder.com/40"
              alt={owner}
              className="w-10 h-10 rounded-full"
            />
            <div>
              <h3 className="font-semibold hover:underline">{owner}</h3>
              <p className="text-sm text-gray-500">{formatDate(createdAt)}</p>
            </div>
          </Link>
          <button className="text-gray-400 hover:text-gray-600">
            <span>•••</span>
          </button>
        </div>

        {/* Post Content */}
        <p className="mt-4 text-gray-800">{content}</p>
      </div>

      {/* Post Stats */}
      <div className="px-4 py-2 border-t border-b border-gray-100">
        <div className="flex items-center justify-between text-gray-500 text-sm">
          <div className="flex items-center space-x-2">
            <span className="text-blue-500">👍</span>
            <span>{likes} likes</span>
          </div>
          <div className="flex items-center space-x-2">
            <span>{comments.length} comments</span>
          </div>
        </div>
      </div>

      {/* Post Actions */}
      <div className="px-4 py-2">
        <div className="flex justify-between">
          <button
            onClick={handleLike}
            className={`flex-1 flex items-center justify-center space-x-2 p-2 hover:bg-gray-100 rounded-lg ${
              isLiked ? "text-blue-500" : "text-gray-500"
            }`}
          >
            <span>👍</span>
            <span>Like</span>
          </button>
          <button
            onClick={() => setShowComments(!showComments)}
            className="flex-1 flex items-center justify-center space-x-2 p-2 hover:bg-gray-100 rounded-lg text-gray-500"
          >
            <span>💬</span>
            <span>Comment</span>
          </button>
          <button className="flex-1 flex items-center justify-center space-x-2 p-2 hover:bg-gray-100 rounded-lg text-gray-500">
            <span>↗️</span>
            <span>Share</span>
          </button>
        </div>
      </div>

      {/* Comments Section */}
      {showComments && (
        <div className="px-4 py-2 border-t border-gray-100">
          {/* Comments List */}
          <div className="space-y-3 mb-4">
            {comments.map((comment) => (
              <div key={comment._id} className="flex space-x-2">
                <img
                  src="https://via.placeholder.com/32"
                  alt={comment.owner}
                  className="w-8 h-8 rounded-full"
                />
                <div className="flex-1">
                  <div className="bg-gray-100 rounded-2xl px-4 py-2">
                    <Link
                      to={`/profile/${comment.owner}`}
                      className="font-semibold hover:underline"
                    >
                      {comment.owner}
                    </Link>
                    <p className="text-gray-800">{comment.content}</p>
                  </div>
                  <div className="flex items-center space-x-4 mt-1 text-sm text-gray-500">
                    <button className="hover:text-gray-700">Like</button>
                    <button className="hover:text-gray-700">Reply</button>
                    <span>3h</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Comment Form */}
          {user && (
            <form
              onSubmit={handleCommentSubmit}
              className="flex items-center space-x-2"
            >
              <img
                src={user.imgUrl || "https://via.placeholder.com/32"}
                alt={user.username}
                className="w-8 h-8 rounded-full"
              />
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Write a comment..."
                  className="w-full px-4 py-2 bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-blue-500 hover:text-blue-600"
                >
                  <span>📤</span>
                </button>
              </div>
            </form>
          )}
        </div>
      )}
    </div>
  );
}

export default Post;

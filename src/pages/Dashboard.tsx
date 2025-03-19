// import { useEffect, useState } from "react";
// import { fetchAllPosts } from "../services/posts-service";
// import { IPost } from "../types";
// import Post from "../components/Post";
// import Alert from "../components/Alert";

// function Dashboard() {
//   const [posts, setPosts] = useState<IPost[]>([]);

//   useEffect(() => {
//     const loadPosts = async () => {
//       try {
//         const fetchedPosts = await fetchAllPosts();
//         setPosts(fetchedPosts);
//       } catch {
//         Alert("Error loading posts!", "error");
//       }
//     };

//     loadPosts();
//   }, []);

//   return (
//     <div>
//       <h1>Dashboard</h1>
//       <div className="posts-section">
//         {posts.map((post) => (
//           <Post key={post._id} {...post} onLike={() => {}} />
//         ))}
//       </div>
//     </div>
//   );
// }

// export default Dashboard;

import React, { useEffect, useState } from "react";
import { fetchAllPosts } from "../services/posts-service";
import { IPost } from "../types";
import Alert from "../components/Alert";
import Post from "../components/Post";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [content, setContent] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [user] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  useEffect(() => {
    const loadPosts = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const fetchedPosts = await fetchAllPosts();
        fetchedPosts.sort((a, b) => {
          const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
          const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
          return dateB - dateA;
        });
        setPosts(fetchedPosts);
      } catch (error) {
        console.error("Failed to load posts:", error);
        setError("Failed to load posts. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    loadPosts();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      Alert("Please login to create a post", "error");
      return;
    }

    const formData = new FormData();
    formData.append("content", content);
    if (image) formData.append("image", image);

    try {
      const response = await fetch("/api/posts", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to create post");
      }

      const newPost = await response.json();
      setPosts((prevPosts) => [newPost, ...prevPosts]);
      setContent("");
      setImage(null);
      Alert("Post created successfully!", "success");
    } catch (error) {
      Alert(
        error instanceof Error ? error.message : "Failed to create post",
        "error"
      );
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <h2 className="text-xl font-bold text-red-600 mb-4">Error</h2>
          <p className="text-gray-600">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex justify-between max-w-[1920px] mx-auto px-4">
        {/* Left Sidebar */}
        <div className="w-[300px] fixed left-4">
          <div className="bg-white rounded-lg shadow p-4 mt-4">
            <div className="flex items-center space-x-3 mb-4">
              <img
                src={user?.imgUrl || "https://via.placeholder.com/40"}
                alt="Profile"
                className="w-10 h-10 rounded-full"
              />
              <div>
                <h3 className="font-semibold">{user?.username}</h3>
                <p className="text-sm text-gray-500">Developer</p>
              </div>
            </div>
            <nav className="space-y-2">
              <Link
                to="/profile"
                className="flex items-center space-x-3 p-2 hover:bg-gray-100 rounded-lg"
              >
                <span>👤</span>
                <span>Profile</span>
              </Link>
              <Link
                to="/my-posts"
                className="flex items-center space-x-3 p-2 hover:bg-gray-100 rounded-lg"
              >
                <span>📝</span>
                <span>My Posts</span>
              </Link>
              <Link
                to="/saved"
                className="flex items-center space-x-3 p-2 hover:bg-gray-100 rounded-lg"
              >
                <span>🔖</span>
                <span>Saved</span>
              </Link>
              <Link
                to="/daily-quiz"
                className="flex items-center space-x-3 p-2 hover:bg-gray-100 rounded-lg"
              >
                <span>🎯</span>
                <span>Daily Quiz</span>
              </Link>
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 max-w-[680px] mx-auto">
          {/* Create Post Card */}
          <div className="bg-white rounded-lg shadow mt-4 p-4">
            <div className="flex space-x-3">
              <img
                src={user?.imgUrl || "https://via.placeholder.com/40"}
                alt="Profile"
                className="w-10 h-10 rounded-full"
              />
              <div className="flex-1">
                <form onSubmit={handleSubmit}>
                  <textarea
                    className="w-full p-3 bg-gray-100 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="What's on your mind?"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    rows={3}
                  />
                  <div className="flex items-center justify-between mt-3">
                    <label className="flex items-center space-x-2 cursor-pointer text-gray-600 hover:text-blue-500 p-2 rounded-lg hover:bg-gray-100">
                      <span>📷</span>
                      <span>Photo</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) =>
                          setImage(e.target.files ? e.target.files[0] : null)
                        }
                        className="hidden"
                      />
                    </label>
                    <button
                      type="submit"
                      className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                    >
                      Post
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>

          {/* Posts Feed */}
          <div className="space-y-4 mt-4">
            {posts.length === 0 ? (
              <div className="bg-white rounded-lg shadow p-4 text-center">
                <p className="text-gray-600">
                  No posts yet. Be the first to post!
                </p>
              </div>
            ) : (
              posts.map((post) => (
                <Post key={post._id} {...post} onLike={() => {}} />
              ))
            )}
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="w-[300px] fixed right-4">
          <div className="bg-white rounded-lg shadow p-4 mt-4">
            <h3 className="font-semibold mb-3">Trending Topics</h3>
            <div className="space-y-2">
              <div className="p-2 hover:bg-gray-100 rounded-lg cursor-pointer">
                <p className="font-medium">#JavaScript</p>
                <p className="text-sm text-gray-500">1.2k posts</p>
              </div>
              <div className="p-2 hover:bg-gray-100 rounded-lg cursor-pointer">
                <p className="font-medium">#React</p>
                <p className="text-sm text-gray-500">856 posts</p>
              </div>
              <div className="p-2 hover:bg-gray-100 rounded-lg cursor-pointer">
                <p className="font-medium">#TypeScript</p>
                <p className="text-sm text-gray-500">654 posts</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-4 mt-4">
            <h3 className="font-semibold mb-3">Active Developers</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <img
                  src="https://via.placeholder.com/32"
                  alt="Dev"
                  className="w-8 h-8 rounded-full"
                />
                <div>
                  <p className="font-medium">John Doe</p>
                  <p className="text-sm text-gray-500">Full Stack Developer</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <img
                  src="https://via.placeholder.com/32"
                  alt="Dev"
                  className="w-8 h-8 rounded-full"
                />
                <div>
                  <p className="font-medium">Jane Smith</p>
                  <p className="text-sm text-gray-500">Frontend Developer</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

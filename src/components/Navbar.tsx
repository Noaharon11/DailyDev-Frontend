import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { useUser } from "../contexts/UserContext";
import { IUser, IPost } from "../types";
import { searchAll } from "../services/search-service";
import CommentsModalPortal from "./CommentsModalPortal";
import "./Navbar.css";

// Union type with 'type' to distinguish
type SearchResult = (IUser & { type: "user" }) | (IPost & { type: "post" });

function Navbar() {
  const { currentUser, logoutUser } = useUser();
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [selectedPost, setSelectedPost] = useState<IPost | null>(null);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (searchTerm.trim()) {
        searchAll(searchTerm)
          .then(setResults)
          .catch((err) => console.error("Search failed", err));
      } else {
        setResults([]);
      }
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [searchTerm]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setResults([]);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!currentUser) return null;

  return (
    <nav className="navbar">
      <Link to="/dashboard" className="navbar-logo">
        <img src={logo} alt="DailyDev Logo" className="logo-img" />
      </Link>

      <div className="search-container" ref={searchRef}>
        <input
          type="text"
          placeholder="Search users or posts..."
          className="search-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {results.length > 0 && (
          <div className="search-results">
            {results.map((item) =>
              item.type === "user" ? (
                <div
                  key={item._id}
                  className="search-result"
                  onClick={() => {
                    navigate(`/profile/${item._id}`);
                    setResults([]);
                    setSearchTerm("");
                  }}
                >
                  <img
                    src={
                      (item as IUser).profilePicture || "/src/assets/photo.png"
                    }
                    alt="user"
                    className="search-avatar"
                  />
                  <span>{(item as IUser).username}</span>
                </div>
              ) : (
                <div
                  key={item._id}
                  className="search-result"
                  onClick={() => {
                    setSelectedPost(item as IPost);
                    setResults([]);
                    setSearchTerm("");
                  }}
                >
                  <span>📝 {(item as IPost).content.slice(0, 30)}...</span>
                </div>
              )
            )}
          </div>
        )}
      </div>

      <div className="navbar-links">
        <Link to="/dashboard">Home</Link>
        <Link to={`/profile/${currentUser._id}`}>Profile</Link>
        <Link to="/challenges">Challenge</Link>
      </div>

      <div className="navbar-user">
        <span>{currentUser.username}</span>
        {currentUser.profilePicture && (
          <img
            src={currentUser.profilePicture}
            alt="Profile"
            className="user-avatar"
          />
        )}
        <button className="logout-btn" onClick={logoutUser}>
          Logout
        </button>
      </div>

      {selectedPost && (
        <CommentsModalPortal
          post={selectedPost}
          onClose={() => setSelectedPost(null)}
        />
      )}
    </nav>
  );
}

export default Navbar;

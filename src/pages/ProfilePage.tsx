import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchUserProfile } from "../services/user-service";
import { fetchPostsByUser } from "../services/posts-service";
import { IUser, IPost } from "../types";
import Post from "../components/Post";
import { useUser } from "../contexts/UserContext";
import EditProfileModal from "../components/EditProfileModal";
import "./ProfilePage.css";
import ChatModal from "../components/ChatModal";

const ProfilePage: React.FC = () => {
  const { userId } = useParams();
  const { currentUser, setCurrentUser } = useUser();
  const [showChat, setShowChat] = useState(false);
  const [user, setUser] = useState<IUser | null>(null);
  const [posts, setPosts] = useState<IPost[]>([]);
  const [showModal, setShowModal] = useState(false);

  const isCurrentUser = currentUser?._id === userId;

  useEffect(() => {
    const loadData = async () => {
      if (!userId) return;

      try {
        const userData = await fetchUserProfile(userId);
        setUser(userData);

        const userPosts = await fetchPostsByUser(userId);
        setPosts(userPosts);
      } catch (err) {
        console.error("Error loading profile data:", err);
      }
    };

    loadData();
  }, [userId]);

  if (!user) return <p>Loading profile...</p>;

  return (
    <div className="profile-page">
      <div className="profile-header">
        <img
          className="profile-image"
          src={user.profilePicture || "/src/assets/photo.png"}
          alt="Profile"
        />
        <h2 className="profile-username">{user.username}</h2>
        <p className="profile-bio">
          {user.bio ? user.bio : "No bio available."}
        </p>
        <p className="profile-email">{user.email}</p>

        {isCurrentUser ? (
          <button
            className="edit-profile-btn"
            onClick={() => setShowModal(true)}
          >
            Edit Profile
          </button>
        ) : (
          <button
            className="send-message-btn"
            onClick={() => setShowChat(true)}
          >
            Send Message
          </button>
        )}
      </div>

      {showModal && user && (
        <EditProfileModal
          user={user}
          onClose={() => setShowModal(false)}
          onUpdate={(updatedUser) => {
            setUser(updatedUser);
            setCurrentUser(updatedUser);
          }}
        />
      )}

      {showChat && user && currentUser && !isCurrentUser && (
        <ChatModal
          key={user._id}
          currentUserId={currentUser._id}
          otherUserId={user._id}
          otherUser={user}
          onClose={() => setShowChat(false)}
        />
      )}

      <h3 className="section-title">Posts</h3>
      <div className="profile-posts">
        {posts.length === 0 ? (
          <p>This user has not posted anything yet.</p>
        ) : (
          posts.map((post) => <Post key={post._id} post={post} />)
        )}
      </div>
    </div>
  );
};

export default ProfilePage;

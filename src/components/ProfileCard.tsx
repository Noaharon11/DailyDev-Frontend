import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../contexts/UserContext";
import EditProfileModal from "./EditProfileModal";
import "./ProfileCard.css";

const ProfileCard: React.FC = () => {
  const { currentUser } = useUser();
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const { setCurrentUser } = useUser();

  if (!currentUser) return null;

  return (
    <div className="profile-card">
      <img
        src={currentUser.imageUrl || "/src/assets/photo.png"}
        alt="Profile"
        className="profile-avatar"
      />
      {/* <h3>{currentUser.username || "Guest"}</h3> */}
      <h3
        className="profile-username clickable"
        onClick={() => navigate(`/profile/${currentUser._id}`)}
      >
        {currentUser.username || "Guest"}
      </h3>
      <p className="profile-bio">
        {currentUser.bio
          ? currentUser.bio
          : "No bio available. Click edit to add one!"}
      </p>

      <button className="edit-profile-btn" onClick={() => setShowModal(true)}>
        Edit Profile
      </button>

      {showModal && (
        <EditProfileModal
          user={currentUser}
          onClose={() => setShowModal(false)}
          onUpdate={(updatedUser) => setCurrentUser(updatedUser)}
        />
      )}
    </div>
  );
};

export default ProfileCard;

import React from "react";
import { IUser } from "../types";
import "./ProfileCard.css";

interface ProfileCardProps {
  user: IUser;
  isCurrentUser: boolean;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ user, isCurrentUser }) => {
  return (
    <div className="profile-card">
      <img
        src={user.imageUrl || "/default-avatar.png"}
        alt="Profile"
        className="profile-img"
      />
      <h2 className="profile-name">{user.username}</h2>
      <p className="profile-bio">
        {user.bio || "No bio yet. Add something about yourself!"}
      </p>

      <div className="profile-stats">
        <div>
          <span className="stat-number">12</span>
          <span className="stat-label">Posts</span>
        </div>
        <div>
          <span className="stat-number">256</span>
          <span className="stat-label">Likes</span>
        </div>
        <div>
          <span className="stat-number">8</span>
          <span className="stat-label">Challenges</span>
        </div>
      </div>

      {isCurrentUser && (
        <button className="edit-profile-btn">Edit Profile</button>
      )}
    </div>
  );
};

export default ProfileCard;

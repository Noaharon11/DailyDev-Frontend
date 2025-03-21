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
        className="profile-avatar"
      />
      <h3>{user.username}</h3>
      {user.bio && <p className="profile-bio">{user.bio}</p>}
      {isCurrentUser && (
        <button className="edit-profile-btn">Edit Profile</button>
      )}
    </div>
  );
};

export default ProfileCard;

// import React from "react";
// import { IUser } from "../types";
// import "./ProfileCard.css";

// interface ProfileCardProps {
//   user: IUser;
//   isCurrentUser: boolean;
// }

// const ProfileCard: React.FC<ProfileCardProps> = ({ user, isCurrentUser }) => {
//   return (
//     <div className="profile-card">
//       <img
//         src={user.imageUrl || "/default-avatar.png"}
//         alt="Profile"
//         className="profile-avatar"
//       />
//       <h3>{user.username}</h3>
//       {user.bio && <p className="profile-bio">{user.bio}</p>}
//       {isCurrentUser && (
//         <button className="edit-profile-btn">Edit Profile</button>
//       )}
//     </div>
//   );
// };

// export default ProfileCard;

import React from "react";
import { IUser } from "../types";
import { useNavigate } from "react-router-dom";
import "./ProfileCard.css";

interface ProfileCardProps {
  user: IUser;
  isCurrentUser: boolean;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ user, isCurrentUser }) => {
  const navigate = useNavigate();

  return (
    <div className="profile-card">
      {/* תמונת משתמש או ברירת מחדל */}
      <img
        src={user.imageUrl || "/src/assets/photo.png"}
        alt="Profile"
        className="profile-avatar"
      />

      {/* שם המשתמש */}
      <h3>{user.username || "Guest"}</h3>

      {/* ביוגרפיה עם טקסט ברירת מחדל */}
      <p className="profile-bio">
        {user.bio ? user.bio : "No bio available. Click edit to add one!"}
      </p>

      {/* כפתור עריכה זמין רק למשתמש הנוכחי */}
      {isCurrentUser && (
        <button
          className="edit-profile-btn"
          onClick={() => navigate("/profile/edit")}
        >
          Edit Profile
        </button>
      )}
    </div>
  );
};

export default ProfileCard;

// // ProfileCard.tsx
// import React, { useState } from "react";
// import { IUser } from "../types";
// import EditProfileModal from "./EditProfileModal";
// import "./ProfileCard.css";

// interface ProfileCardProps {
//   user: IUser;
//   isCurrentUser: boolean;
//   onUpdate: (updatedUser: IUser) => void;
// }

// const ProfileCard: React.FC<ProfileCardProps> = ({
//   user,
//   isCurrentUser,
//   onUpdate,
// }) => {
//   const [showModal, setShowModal] = useState(false);

//   return (
//     <div className="profile-card">
//       <img
//         src={user.imageUrl || "/src/assets/photo.png"}
//         alt="Profile"
//         className="profile-avatar"
//       />
//       <h3>{user.username || "Guest"}</h3>
//       <p className="profile-bio">
//         {user.bio ? user.bio : "No bio available. Click edit to add one!"}
//       </p>
//       {isCurrentUser && (
//         <button className="edit-profile-btn" onClick={() => setShowModal(true)}>
//           Edit Profile
//         </button>
//       )}

//       {showModal && (
//         <EditProfileModal
//           user={user}
//           onClose={() => setShowModal(false)}
//           onUpdate={onUpdate}
//         />
//       )}
//     </div>
//   );
// };

// export default ProfileCard;

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

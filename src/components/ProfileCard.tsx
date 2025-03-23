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
import { useUser } from "../contexts/UserContext";
import EditProfileModal from "./EditProfileModal";
import "./ProfileCard.css";

const ProfileCard: React.FC = () => {
  const { currentUser } = useUser();
  const [showModal, setShowModal] = useState(false);

  if (!currentUser) return null;

  return (
    <div className="profile-card">
      <img
        src={currentUser.imageUrl || "/src/assets/photo.png"}
        alt="Profile"
        className="profile-avatar"
      />
      <h3>{currentUser.username || "Guest"}</h3>
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
          onUpdate={() => {}} // לא חובה, כי currentUser מגיע מהקונטקסט ומתעדכן אוטומטית
        />
      )}
    </div>
  );
};

export default ProfileCard;

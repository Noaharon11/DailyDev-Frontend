import React, { useState } from "react";
import { IUser } from "../types";
import { updateUserProfile } from "../services/user-service";
import { uploadFile } from "../services/file-service";
import Alert from "./Alert";
import "./EditProfileModal.css";
import { useUser } from "../contexts/UserContext";

interface EditProfileModalProps {
  user: IUser;
  onClose: () => void;
  onUpdate: (updatedUser: IUser) => void;
}

const EditProfileModal: React.FC<EditProfileModalProps> = ({
  user,
  onClose,
  onUpdate,
}) => {
  const [username, setUsername] = useState(user.username || "");
  const [bio, setBio] = useState(user.bio || "");
  const [avatar, setAvatar] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState(user.profilePicture || "");
  const { setCurrentUser } = useUser();

  const handleSubmit = async () => {
    try {
      let profilePicture = user.profilePicture;

      if (avatar) {
        profilePicture = await uploadFile(avatar);
      }

      // 🛡️ Validation
      if (!username.trim()) {
        Alert("Username cannot be empty", "error");
        return;
      }

      const updatedUser = await updateUserProfile({
        userId: user._id,
        username,
        bio,
        profilePicture,
      });
      console.log("updatedUser:", updatedUser);

      setCurrentUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
      onUpdate(updatedUser);
      Alert("Profile updated successfully", "success");
      onClose();
    } catch (error) {
      console.error("Error updating profile:", error);
      Alert("Failed to update profile", "error");
    }
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatar(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  return (
    <div className="edit-profile-modal-overlay">
      <div className="edit-profile-modal">
        <h2>Edit Profile</h2>

        <div className="profile-avatar-preview">
          <img src={previewUrl || "/src/assets/photo.png"} alt="Avatar" />
        </div>

        <label>
          Change Profile Picture:
          <input type="file" accept="image/*" onChange={handleAvatarChange} />
        </label>

        <label>Username:</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <label>Bio:</label>
        <textarea
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          placeholder="Tell us a bit about yourself..."
        />

        <div className="modal-actions">
          <button className="save-btn" onClick={handleSubmit}>
            Save
          </button>
          <button className="cancel-btn" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProfileModal;

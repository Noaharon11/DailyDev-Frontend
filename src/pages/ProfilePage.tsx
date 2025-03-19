import { useEffect, useState, useRef } from "react";
import { Container, Button, Form, Modal } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { getUserProfile, updateUserProfile } from "../services/user-service";
import { uploadUserAvatar } from "../services/file-service";
// import {
//   getUserProfile,
//   updateUserProfile,
// } from "../services/mock-user-service";
//import { uploadUserAvatar } from "../services/mock-file-service";
import "./ProfilePage.css";
import { IUser } from "../types";
import Alert from "../components/Alert";

function ProfilePage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [user, setUser] = useState<IUser | null>(null);
  const [editing, setEditing] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const loadUserProfile = async () => {
      try {
        const fetchedUser = await getUserProfile(id || "");
        setUser(fetchedUser);
      } catch {
        Alert("Error loading profile!", "error");
        navigate("/dashboard");
      }
    };
    loadUserProfile();
  }, [id, navigate]);

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (user) {
      setUser({ ...user, username: e.target.value });
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0] && user) {
      try {
        const file = e.target.files[0];
        const imgUrl = await uploadUserAvatar(user._id!, file); // ✅ שליחת userId + קובץ
        setUser({ ...user, avatar: imgUrl });
      } catch {
        Alert("Failed to upload image!", "error");
      }
    }
  };

  const handleSaveChanges = async () => {
    if (!user || !user._id) {
      Alert("User not found. Please log in again.", "error");
      return;
    }

    try {
      const updates = { username: user.username, avatar: user.avatar }; // send only username and avatar
      await updateUserProfile(user._id, updates);
      Alert("Profile updated successfully!", "success");
      setEditing(false);
    } catch {
      Alert("Error updating profile!", "error");
    }
  };

  const handleCancelEdit = () => {
    setShowWarning(true);
  };

  const confirmCancel = () => {
    setEditing(false);
    setShowWarning(false);
  };

  return (
    <Container className="profile-container">
      <h2>{id ? `${user?.username}'s Profile` : "My Profile"}</h2>
      <div className="profile-info">
        <img
          src={user?.avatar || "https://via.placeholder.com/150"}
          alt="Profile"
          className="profile-pic"
        />
        {!id && (
          <>
            <Button
              className="upload-btn"
              onClick={() => fileInputRef.current?.click()}
            >
              Upload New Picture
            </Button>
            <input
              ref={fileInputRef}
              type="file"
              className="file-input"
              onChange={handleImageUpload}
            />
          </>
        )}

        <Form.Group className="mt-3">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            value={user?.username || ""}
            onChange={handleUsernameChange}
            disabled={!!id || !editing}
          />
        </Form.Group>

        <Form.Group className="mt-3">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" value={user?.email || ""} disabled />
        </Form.Group>

        {!id && (
          <>
            {editing ? (
              <>
                <Button className="save-btn" onClick={handleSaveChanges}>
                  Save Changes
                </Button>
                <Button className="cancel-btn" onClick={handleCancelEdit}>
                  Cancel
                </Button>
              </>
            ) : (
              <Button className="edit-btn" onClick={() => setEditing(true)}>
                Edit Profile
              </Button>
            )}
          </>
        )}
      </div>

      <Modal show={showWarning} onHide={() => setShowWarning(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Unsaved Changes</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          You have unsaved changes. Are you sure you want to leave?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowWarning(false)}>
            Stay
          </Button>
          <Button variant="danger" onClick={confirmCancel}>
            Leave Without Saving
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default ProfilePage;

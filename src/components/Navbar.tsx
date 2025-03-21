import { Link } from "react-router-dom";
import "./Navbar.css";
import logo from "../assets/logo.png";

function Navbar({
  user,
  onLogout,
}: {
  user: { username: string; imageUrl?: string };
  onLogout: () => void;
}) {
  return (
    <nav className="navbar">
      {/* לוגו */}
      <Link to="/dashboard" className="navbar-logo">
        <img src={logo} alt="DailyDev Logo" className="logo-img" />
      </Link>

      {/* תיבת חיפוש */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Search users or posts..."
          className="search-input"
        />
        {/* כאן נוכל להוסיף תוצאות חיפוש דינאמיות */}
      </div>

      {/* ניווט */}
      <div className="navbar-links">
        <Link to="/dashboard">Home</Link>
        <Link to="/profile">Profile</Link>
        <Link to="/challenges">Challenge</Link>
      </div>

      {/* אזור משתמש */}
      <div className="navbar-user">
        <span>{user.username}</span>
        {user.imageUrl && (
          <img src={user.imageUrl} alt="Profile" className="user-avatar" />
        )}
        <button className="logout-btn" onClick={onLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;

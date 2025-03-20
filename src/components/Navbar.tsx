import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar({
  user,
  onLogout,
}: {
  user: { username: string; imageUrl?: string };
  onLogout: () => void;
}) {
  return (
    <nav className="navbar">
      <Link to="/dashboard" className="navbar-logo">
        🚀 DailyDev
      </Link>
      <div className="navbar-links">
        <Link to="/feed">Feed</Link>
        <Link to="/challenges">Challenges</Link>
        <Link to="/leaderboard">Leaderboard</Link>
        <Link to="/community">Community</Link>
      </div>
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

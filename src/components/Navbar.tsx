// import { Link } from "react-router-dom";
// import "./Navbar.css";
// import logo from "../assets/logo.png";

// function Navbar({
//   user,
//   onLogout,
// }: {
//   user: { username: string; imageUrl?: string; _id: string };
//   onLogout: () => void;
// }) {
//   return (
//     <nav className="navbar">
//       {/* לוגו */}
//       <Link to="/dashboard" className="navbar-logo">
//         <img src={logo} alt="DailyDev Logo" className="logo-img" />
//       </Link>

//       {/* תיבת חיפוש */}
//       <div className="search-container">
//         <input
//           type="text"
//           placeholder="Search users or posts..."
//           className="search-input"
//         />
//         {/* כאן נוכל להוסיף תוצאות חיפוש דינאמיות */}
//       </div>

//       {/* ניווט */}
//       <div className="navbar-links">
//         <Link to="/dashboard">Home</Link>
//         <Link to={`/profile/${user._id || user.id}`}>Profile</Link>

//         <Link to="/challenges">Challenge</Link>
//       </div>

//       {/* אזור משתמש */}
//       <div className="navbar-user">
//         <span>{user.username}</span>
//         {user.imageUrl && (
//           <img src={user.imageUrl} alt="Profile" className="user-avatar" />
//         )}
//         <button className="logout-btn" onClick={onLogout}>
//           Logout
//         </button>
//       </div>
//     </nav>
//   );
// }

// export default Navbar;

import { Link } from "react-router-dom";
import "./Navbar.css";
import logo from "../assets/logo.png";
import { useUser } from "../contexts/UserContext";

function Navbar() {
  const { currentUser, logoutUser } = useUser();

  if (!currentUser) return null;

  return (
    <nav className="navbar">
      <Link to="/dashboard" className="navbar-logo">
        <img src={logo} alt="DailyDev Logo" className="logo-img" />
      </Link>

      <div className="search-container">
        <input
          type="text"
          placeholder="Search users or posts..."
          className="search-input"
        />
      </div>

      <div className="navbar-links">
        <Link to="/dashboard">Home</Link>
        <Link to={`/profile/${currentUser._id}`}>Profile</Link>
        <Link to="/challenges">Challenge</Link>
      </div>

      <div className="navbar-user">
        <span>{currentUser.username}</span>
        {currentUser.imageUrl && (
          <img
            src={currentUser.imageUrl}
            alt="Profile"
            className="user-avatar"
          />
        )}
        <button className="logout-btn" onClick={logoutUser}>
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;

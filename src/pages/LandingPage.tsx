// import { Link } from "react-router-dom";
// import "./LandingPage.css";

// function LandingPage() {
//   return (
//     <div className="landing-container">
//       <div className="overlay"></div>
//       <div className="landing-content">
//         <h1>
//           Welcome to <span>DailyDev</span>
//         </h1>
//         <p>Share your projects, collaborate, and grow together!</p>

//         <div className="landing-buttons">
//           <Link to="/login" className="btn btn-primary">
//             Login
//           </Link>
//           <Link to="/register" className="btn btn-secondary">
//             Sign Up
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default LandingPage;

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LandingPage.css";

function LandingPage() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleStartClick = () => {
    if (isLoggedIn) {
      navigate("/dashboard");
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="landing-container">
      <div className="overlay"></div>
      <div className="landing-content">
        <h1>
          Welcome to <span>DailyDev</span>
        </h1>
        <p>Share your projects, collaborate, and grow together!</p>

        <button className="btn-start" onClick={handleStartClick}>
          Let's Start →
        </button>
      </div>
    </div>
  );
}

export default LandingPage;

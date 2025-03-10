import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Alert } from "react-bootstrap";

const Home = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<{
    username: string;
    imgUrl?: string | null;
  } | null>(null);

  useEffect(() => {
    // Check if user is stored in localStorage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      // If no user found, redirect to login page
      navigate("/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="container text-center mt-5">
      <Alert variant="success">
        <h1>Welcome to DailyDev! 🚀</h1>
        <p>Your personalized development hub.</p>
      </Alert>

      {user && (
        <div
          className="card p-4 shadow-lg mx-auto"
          style={{ maxWidth: "400px" }}
        >
          <h2 className="mb-3">Hello, {user.username}! 👋</h2>
          <div className="d-flex justify-content-center">
            <img
              src={user.imgUrl || "https://via.placeholder.com/150"}
              alt="Profile"
              className="rounded-circle shadow-sm"
              style={{ width: "150px", height: "150px", objectFit: "cover" }}
            />
          </div>
          <button className="btn btn-danger mt-3 w-100" onClick={handleLogout}>
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default Home;

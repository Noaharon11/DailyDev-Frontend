import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Register from "./pages/Registration";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/ProfilePage";
import Challenges from "./pages/Challenges";
import { IUser } from "./types/index";
import { getUserProfile } from "./services/user-service";
import "./App.css";

function App() {
  const [currentUser, setCurrentUser] = useState<IUser | null>(null);

  // ✅ טוען את המשתמש מהשרת כשהאפליקציה נטענת
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await getUserProfile();
        setCurrentUser(user);
      } catch {
        setCurrentUser(null);
      }
    };
    fetchUser();
  }, []);

  // ✅ פונקציה להתנתקות - מסירה מהסטייט ומה-localStorage
  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  return (
    <Router>
      {currentUser && <Navbar user={currentUser} onLogout={handleLogout} />}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route
          path="/login"
          element={
            currentUser ? (
              <Navigate to="/dashboard" />
            ) : (
              <Login setUser={setCurrentUser} />
            )
          }
        />
        <Route
          path="/register"
          element={
            currentUser ? (
              <Navigate to="/dashboard" />
            ) : (
              <Register setUser={setCurrentUser} />
            )
          }
        />

        {/* דפים למשתמש מחובר בלבד */}
        {currentUser ? (
          <>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/challenges" element={<Challenges />} />
          </>
        ) : (
          <Route path="/*" element={<Navigate to="/login" />} />
        )}
      </Routes>
      {currentUser && <Footer />}
    </Router>
  );
}

export default App;

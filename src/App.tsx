import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Register from "./pages/Registration";
import Dashboard from "./pages/Dashboard";
import ProfilePage from "./pages/ProfilePage";
import Challenges from "./pages/Challenges";
import { IUser } from "./types/index";
import { getUserProfile, logoutUser } from "./services/user-service";
import "./App.css";

// ✅ Declare logoutUser globally for TypeScript compatibility
declare global {
  interface Window {
    logoutUser: () => void;
  }
}

function Layout({
  children,
  currentUser,
  handleLogout,
}: {
  children: React.ReactNode;
  currentUser: IUser | null;
  handleLogout: () => void;
}) {
  const location = useLocation();

  // ✅ Define where Navbar and Footer should be hidden
  const hideNavbar = ["/", "/login", "/register"].includes(location.pathname);
  const hideFooter = ["/"].includes(location.pathname); // Footer is only hidden in LandingPage

  return (
    <>
      {/* ✅ Show Navbar only if user is logged in and not on hidden pages */}
      {!hideNavbar && currentUser && (
        <Navbar
          user={{
            username: currentUser.username ?? "Guest",
            imageUrl: currentUser.imageUrl,
          }}
          onLogout={handleLogout}
        />
      )}
      {children}
      {/* ✅ Show Footer only when not on LandingPage */}
      {!hideFooter && <Footer />}
    </>
  );
}

function App() {
  const [currentUser, setCurrentUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await getUserProfile();
        setCurrentUser(user);
        setIsAuthenticated(true);
      } catch {
        setCurrentUser(null);
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  // ✅ Attach logout function globally
  useEffect(() => {
    window.logoutUser = handleLogout;
  }, []);

  const handleLogout = async () => {
    await logoutUser();
    setCurrentUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  // ✅ Prevent navigation issues by waiting for authentication to load
  if (loading) return <p>Loading...</p>;

  return (
    <Router>
      <Layout currentUser={currentUser} handleLogout={handleLogout}>
        <Routes>
          {/* ✅ Default to LandingPage */}
          <Route path="/" element={<LandingPage />} />
          {/* ✅ Redirect to Dashboard if already logged in */}
          <Route
            path="/login"
            element={
              isAuthenticated ? (
                <Navigate to="/dashboard" />
              ) : (
                <Login setUser={setCurrentUser} />
              )
            }
          />
          <Route
            path="/register"
            element={
              isAuthenticated ? (
                <Navigate to="/dashboard" />
              ) : (
                <Register setUser={setCurrentUser} />
              )
            }
          />
          {/* ✅ Prevents access to protected routes unless authenticated */}
          <Route
            path="/dashboard"
            element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />}
          />
          <Route
            path="/profile/:userId"
            element={
              isAuthenticated ? <ProfilePage /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/challenges"
            element={
              isAuthenticated ? <Challenges /> : <Navigate to="/login" />
            }
          />
          {/* ✅ Redirect to LandingPage if route does not exist */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;

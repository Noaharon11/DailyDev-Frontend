import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Register from "./pages/Registration";
import Dashboard from "./pages/Dashboard";
import ProfilePage from "./pages/ProfilePage";
import AiChallenge from "./components/AiChallenge"; // הקומפוננטה של Gemini
import { useUser } from "./contexts/UserContext";
import "./App.css";

function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const { currentUser } = useUser();

  const hideNavbar = ["/", "/register"].includes(location.pathname);
  const hideFooter = ["/"].includes(location.pathname);

  return (
    <>
      {!hideNavbar && currentUser && <Navbar />}
      {children}
      {!hideFooter && <Footer />}
    </>
  );
}

function App() {
  const { isAuthenticated } = useUser();

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route
          path="/login"
          element={isAuthenticated ? <Navigate to="/dashboard" /> : <Login />}
        />
        <Route
          path="/register"
          element={
            isAuthenticated ? <Navigate to="/dashboard" /> : <Register />
          }
        />
        <Route
          path="/dashboard"
          element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />}
        />
        <Route
          path="/profile/:userId"
          element={isAuthenticated ? <ProfilePage /> : <Navigate to="/login" />}
        />
        <Route
          path="/challenges"
          element={isAuthenticated ? <AiChallenge /> : <Navigate to="/login" />}
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Layout>
  );
}

export default App;

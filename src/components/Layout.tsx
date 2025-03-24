import React from "react";
import { Outlet } from "react-router-dom";
import "./Layout.css";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useUser } from "../contexts/UserContext";

const Layout: React.FC = () => {
  const { currentUser } = useUser();

  if (!currentUser) return null;

  return (
    <div className="layout">
      <Navbar />
      <main className="main-content">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;

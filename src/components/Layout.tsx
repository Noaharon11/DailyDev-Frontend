import React from "react";
import { Outlet } from "react-router-dom";
import "./Layout.css";
import Navbar from "./Navbar";
import Footer from "./Footer";

interface LayoutProps {
  user: { username: string; imageUrl?: string };
  onLogout: () => void;
  children?: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ user, onLogout, children }) => {
  return (
    <div className="layout">
      <Navbar user={user} onLogout={onLogout} />
      <main className="main-content">{children || <Outlet />}</main>
      <Footer />
    </div>
  );
};

export default Layout;

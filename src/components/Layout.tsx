import React from "react";
import { Outlet } from "react-router-dom";
import "./Layout.css"; // Import styles
import Navbar from "./Navbar";
import Footer from "./Footer";

interface LayoutProps {
  children?: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="layout">
      {/* <Navbar /> */}
      <main className="main-content">{children || <Outlet />}</main>
      <Footer />
    </div>
  );
};

export default Layout;

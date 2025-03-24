// import React from "react";
// import { Outlet } from "react-router-dom";
// import "./Layout.css";
// import Navbar from "./Navbar";
// import Footer from "./Footer";

// interface LayoutProps {
//   user: { username: string; imageUrl?: string; _id: string };
//   onLogout: () => void;
//   children?: React.ReactNode;
// }

// const Layout: React.FC<LayoutProps> = ({ user, onLogout, children }) => {
//   return (
//     <div className="layout">
//       <Navbar user={user} onLogout={onLogout} />
//       <main className="main-content">{children || <Outlet />}</main>
//       <Footer />
//     </div>
//   );
// };

// export default Layout;

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

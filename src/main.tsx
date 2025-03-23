// import React from "react";
// import ReactDOM from "react-dom/client";
// import App from "./App.tsx";
// import "bootstrap/dist/css/bootstrap.css";
// import { GoogleOAuthProvider } from "@react-oauth/google";
// import { UserProvider } from "./contexts/UserContext.tsx";

// ReactDOM.createRoot(document.getElementById("root")!).render(
//   <GoogleOAuthProvider clientId="85174330842-u1lk5r0slht3m33u091l1bvfmchjh3np.apps.googleusercontent.com">
//     <React.StrictMode>
//       <UserProvider>
//         {" "}
//         <App />
//       </UserProvider>
//     </React.StrictMode>
//   </GoogleOAuthProvider>
// );

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "bootstrap/dist/css/bootstrap.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { UserProvider } from "./contexts/UserContext.tsx";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <GoogleOAuthProvider clientId="85174330842-u1lk5r0slht3m33u091l1bvfmchjh3np.apps.googleusercontent.com">
    <React.StrictMode>
      <UserProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </UserProvider>
    </React.StrictMode>
  </GoogleOAuthProvider>
);

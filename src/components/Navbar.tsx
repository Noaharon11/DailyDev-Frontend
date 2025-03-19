// import { Navbar, Nav, Container, NavDropdown, Image } from "react-bootstrap";
// import { Link, useNavigate } from "react-router-dom";

// function AppNavbar() {
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     localStorage.clear(); // clear login data
//     navigate("/login");
//   };

//   return (
//     <Navbar bg="light" expand="lg" className="shadow-sm">
//       <Container>
//         <Navbar.Brand as={Link} to="/">
//           🚀 DailyDev
//         </Navbar.Brand>
//         <Navbar.Toggle aria-controls="navbar-nav" />
//         <Navbar.Collapse id="navbar-nav">
//           <Nav className="me-auto">
//             <Nav.Link as={Link} to="/dashboard">
//               Dashboard
//             </Nav.Link>
//             <Nav.Link as={Link} to="/challenges">
//               Challenges
//             </Nav.Link>
//             <Nav.Link as={Link} to="/chatrooms">
//               Chatrooms
//             </Nav.Link>
//             <Nav.Link as={Link} to="/mylogs">
//               My Logs
//             </Nav.Link>
//           </Nav>
//           <Nav>
//             <NavDropdown
//               title={
//                 <Image
//                   src="https://via.placeholder.com/40"
//                   roundedCircle
//                   width={40}
//                   height={40}
//                 />
//               }
//               align="end"
//             >
//               <NavDropdown.Item as={Link} to="/profile">
//                 Profile
//               </NavDropdown.Item>
//               <NavDropdown.Divider />
//               <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
//             </NavDropdown>
//           </Nav>
//         </Navbar.Collapse>
//       </Container>
//     </Navbar>
//   );
// }

// export default AppNavbar;

import { Navbar, Nav, Container, NavDropdown, Image } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

function AppNavbar() {
  const navigate = useNavigate();
  const storedUser = JSON.parse(localStorage.getItem("user") || "{}");

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="custom-navbar">
      <Container>
        <Navbar.Brand as={Link} to="/">
          🚀 DailyDev
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/dashboard">
              Dashboard
            </Nav.Link>
            <Nav.Link as={Link} to="/challenges">
              Challenges
            </Nav.Link>
            <Nav.Link as={Link} to="/chatrooms">
              Chatrooms
            </Nav.Link>
            <Nav.Link as={Link} to="/mylogs">
              My Logs
            </Nav.Link>
          </Nav>
          <Nav>
            <NavDropdown
              title={
                <Image
                  src={storedUser.imgUrl || "https://via.placeholder.com/40"}
                  roundedCircle
                  width={40}
                  height={40}
                />
              }
              align="end"
            >
              <NavDropdown.Item as={Link} to="/profile">
                Profile
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default AppNavbar;

import AppNavbar from "./Navbar";
import { Container } from "react-bootstrap";

function Dashboard() {
  return (
    <>
      <AppNavbar />
      <Container className="mt-4">
        <h1>Welcome to Your Dashboard 🎉</h1>
        <p>Let's build something amazing!</p>
      </Container>
    </>
  );
}

export default Dashboard;

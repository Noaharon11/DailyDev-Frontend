import { Link } from "react-router-dom";
import "./Footer.css";

function Footer() {
  console.log("Footer loaded");
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section about">
          <h2>DailyDev</h2>
          <p>Share your projects, collaborate, and grow together.</p>
          <p>📍 Tel Aviv, Israel</p>
          <p>📧 contact@dailydev.com</p>
        </div>

        <div className="footer-section links">
          <h3>Navigation</h3>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/dashboard">Dashboard</Link>
            </li>
            <li>
              <Link to="/profile">Profile</Link>
            </li>
          </ul>
        </div>

        <div className="footer-section social">
          <h3>Follow Us</h3>
          <div className="social-icons">
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              🐦 Twitter
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              💻 GitHub
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              🔗 LinkedIn
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2025 DailyDev. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;

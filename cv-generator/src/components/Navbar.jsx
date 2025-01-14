import { NavLink } from "react-router-dom";
import "../styles/Navbar.css";

export default function Navbar() {
  return (
    <nav>
      <h1 className="logo">ResuMake</h1>
      <ul>
        <li className="nav-btns">Sign Up</li>
        <li className="nav-btns">Log In</li>
      </ul>
    </nav>
  );
}

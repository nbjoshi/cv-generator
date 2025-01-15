import { NavLink } from "react-router-dom";
import "../styles/Navbar.css";

export default function Navbar() {
  return (
    <nav>
      <NavLink to="/" className="logo">
        ResuMake
      </NavLink>
      <ul>
        <li>
          <NavLink to="/signup" className="nav-links">
            Sign Up
          </NavLink>
        </li>
        <li>
          <NavLink to="/login" className="nav-links">
            Log In
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

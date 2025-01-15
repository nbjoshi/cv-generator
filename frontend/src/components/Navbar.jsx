import { NavLink, useNavigate } from "react-router-dom";
import { useContext } from "react";
import "../styles/Navbar.css";
import { AuthContext } from "../AuthContext";

export default function Navbar() {
  const { isLoggedIn, setisLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
    setisLoggedIn(false);
    navigate("/");
  };

  return (
    <nav>
      <NavLink to="/" className="logo">
        ResuMake
      </NavLink>
      <ul>
        <li>
          {isLoggedIn ? null : (
            <NavLink to="/signup" className="nav-links">
              Sign Up
            </NavLink>
          )}
        </li>
        <li>
          {isLoggedIn ? (
            <NavLink to="/" className="nav-links" onClick={handleLogout}>
              Log Out
            </NavLink>
          ) : (
            <NavLink to="/login" className="nav-links">
              Log In
            </NavLink>
          )}
        </li>
      </ul>
    </nav>
  );
}

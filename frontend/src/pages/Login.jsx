import { useState, useEffect, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { jwtDecode } from "jwt-decode";
import { AuthContext } from "../AuthContext";
import "../styles/Login.css";

export default function Login() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [checked, setChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();
  const { setIsLoggedIn } = useContext(AuthContext);

  const checkTokenExpiry = (token) => {
    try {
      const decoded = jwtDecode(token);
      return decoded.exp > Date.now() / 1000;
    } catch (error) {
      console.error("Invalid token:", error);
      return false;
    }
  };

  useEffect(() => {
    const token =
      localStorage.getItem("token") || sessionStorage.getItem("token");
    if (token) {
      if (checkTokenExpiry(token)) {
        navigate("/menu");
      } else {
        localStorage.removeItem("token");
        sessionStorage.removeItem("token");
        alert("Session expired. Please log in again.");
      }
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formDataToSend = new FormData();
    formDataToSend.append("username", formData.username);
    formDataToSend.append("password", formData.password);
    try {
      const response = await fetch("http://127.0.0.1:8000/token", {
        method: "POST",
        body: formDataToSend,
      });
      if (response.ok) {
        const data = await response.json();
        const storage = checked ? localStorage : sessionStorage;
        storage.setItem("token", data.access_token);
        setFormData({ username: "", password: "" });
        setIsLoggedIn(true);
        navigate("/menu");
      } else {
        const errorData = await response.json();
        alert(errorData.detail || "Login failed. Please try again.");
      }
    } catch (error) {
      alert("An error occurred. Please try again.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <h1 className="login-title">Login</h1>
      <form className="login-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={formData.username}
          className="input-field"
          onChange={(e) =>
            setFormData({ ...formData, username: e.target.value })
          }
        />
        <div className="password-container">
          <input
            type={passwordVisible ? "text" : "password"}
            placeholder="Password"
            value={formData.password}
            className="input-field password-field"
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />
          <button
            type="button"
            className="toggle-password"
            onClick={() => setPasswordVisible(!passwordVisible)}
          >
            {passwordVisible ? (
              <FontAwesomeIcon icon={faEye} />
            ) : (
              <FontAwesomeIcon icon={faEyeSlash} />
            )}
          </button>
        </div>
        <div className="checkbox-container">
          <input
            type="checkbox"
            id="remember"
            onChange={(e) => setChecked(e.target.checked)}
          />
          <label htmlFor="remember">Remember me</label>
        </div>
        <button className="submit-button" type="submit" disabled={loading}>
          {loading ? "Signing in..." : "Sign in"}
        </button>
        <NavLink to="/signup" className="forgot-password">
          Forgot Password?
        </NavLink>
      </form>
    </div>
  );
}

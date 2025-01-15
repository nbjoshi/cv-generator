import { useState } from "react";
import { NavLink } from "react-router-dom";
import "../styles/Signup.css";

export default function Signup() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateEmail(formData.email)) {
      alert("Invalid email");
      return;
    }
    if (!validatePassword(formData.password)) {
      alert(
        "Password must be at least 8 characters long and contain at least one uppercase letter, lowercase letter, and number."
      );
      return;
    }
    try {
      const response = await fetch("http://127.0.0.1:8000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Could not create user.");
      }
      const data = await response.json();
      if (data === "complete") {
        setFormData({
          email: "",
          username: "",
          password: "",
        });
        alert("User created successfully");
      }
    } catch (error) {
      console.error("Error fetching data:", error.message);
      alert(`Error: ${error.message}`);
    }
  };

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const validatePassword = (password) => {
    if (password.length < 8) {
      return false;
    }
    if (!/[a-z]/.test(password)) {
      return false;
    }
    if (!/[A-Z]/.test(password)) {
      return false;
    }
    if (!/[0-9]/.test(password)) {
      return false;
    }
    return true;
  };

  return (
    <div className="signup-container">
      <div className="signup-header">
        <h1 className="signup-title">Are you ready to get hired sooner?</h1>
        <p className="signup-subtitle">
          Join and unlock your full career potential.
        </p>
      </div>
      <form className="signup-form" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          className="signup-input"
          onChange={(e) => {
            setFormData({ ...formData, email: e.target.value });
          }}
        />
        <input
          type="text"
          placeholder="Username"
          value={formData.username}
          className="signup-input"
          onChange={(e) => {
            setFormData({ ...formData, username: e.target.value });
          }}
        />
        <div className="password-container">
          <input
            type={passwordVisible ? "text" : "password"}
            placeholder="Password"
            value={formData.password}
            className="signup-input password-input"
            onChange={(e) => {
              setFormData({ ...formData, password: e.target.value });
            }}
          />
          <button
            type="button"
            className="password-toggle"
            onClick={() => setPasswordVisible(!passwordVisible)}
          >
            {passwordVisible ? (
              <i className="fa-solid fa-eye"></i>
            ) : (
              <i className="fa-solid fa-eye-slash"></i>
            )}
          </button>
        </div>
        <button className="signup-button" type="submit">
          Get Started
        </button>
        <p className="signup-footer">
          Already a Member?{" "}
          <NavLink to="/login" className="signup-link">
            Sign In
          </NavLink>
        </p>
      </form>
    </div>
  );
}

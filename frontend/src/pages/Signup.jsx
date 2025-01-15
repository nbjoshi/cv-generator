import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

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
    <div className="flex flex-col gap-6 items-center px-4 sm:px-6 lg:px-8">
      <div className="text-center">
        <h1 className="text-2xl sm:text-3xl font-bold mb-2">
          Are you ready to get hired sooner?
        </h1>
        <p className="text-sm sm:text-base">
          Join and unlock your full career potential.
        </p>
      </div>
      <form
        className="flex flex-col gap-4 w-full max-w-md"
        onSubmit={handleSubmit}
      >
        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          className="outline-none border-black border-2 p-2 rounded-md"
          onChange={(e) => {
            setFormData({ ...formData, email: e.target.value });
          }}
        />
        <input
          type="text"
          placeholder="Username"
          value={formData.username}
          className="outline-none border-black border-2 p-2 rounded-md"
          onChange={(e) => {
            setFormData({ ...formData, username: e.target.value });
          }}
        />
        <div className="relative">
          <input
            type={passwordVisible ? "text" : "password"}
            placeholder="Password"
            value={formData.password}
            className="outline-none border-black border-2 p-2 rounded-md w-full pr-10"
            onChange={(e) => {
              setFormData({ ...formData, password: e.target.value });
            }}
          />
          <button
            type="button"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-800"
            onClick={() => setPasswordVisible(!passwordVisible)}
          >
            {passwordVisible ? (
              <i className="fa-solid fa-eye"></i>
            ) : (
              <i className="fa-solid fa-eye-slash"></i>
            )}
          </button>
        </div>
        <button
          className="border-black border-2 rounded-full w-[50%] py-2 bg-black text-white hover:bg-gray-800 transition mx-auto"
          type="submit"
        >
          Get Started
        </button>
        <p className="mx-auto">
          Already a Member?{" "}
          <NavLink to="/login" className="underline">
            Sign In
          </NavLink>
        </p>
      </form>
    </div>
  );
}

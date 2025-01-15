import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

export default function Login() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [checked, setChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();

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
    <div className="flex flex-col gap-6 items-center px-4 sm:px-6 lg:px-8">
      <h1 className="text-2xl sm:text-3xl font-bold mb-2">Login</h1>
      <form
        className="flex flex-col gap-4 w-full max-w-md"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          placeholder="Username"
          value={formData.username}
          className="outline-none border-black border-2 p-2 rounded-md"
          onChange={(e) =>
            setFormData({ ...formData, username: e.target.value })
          }
        />
        <div className="relative">
          <input
            type={passwordVisible ? "text" : "password"}
            placeholder="Password"
            value={formData.password}
            className="outline-none border-black border-2 p-2 rounded-md w-full pr-10"
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
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
        <div>
          <input
            type="checkbox"
            id="remember"
            className="mr-2"
            onChange={(e) => setChecked(e.target.checked)}
          />
          <label htmlFor="remember">Remember me</label>
        </div>
        <button
          className="border-black border-2 rounded-full w-[50%] py-2 bg-black text-white hover:bg-gray-800 transition mx-auto"
          type="submit"
          disabled={loading}
        >
          {loading ? "Signing in..." : "Sign in"}
        </button>
        <NavLink to="/login" className="underline mx-auto">
          Forgot Password?
        </NavLink>
      </form>
    </div>
  );
}

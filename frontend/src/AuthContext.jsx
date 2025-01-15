import { createContext, useState } from "react";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const token =
    localStorage.getItem("token") || sessionStorage.getItem("token");
  const isTokenValid = token && jwtDecode(token).exp > Date.now() / 1000;

  const [isLoggedIn, setIsLoggedIn] = useState(isTokenValid);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

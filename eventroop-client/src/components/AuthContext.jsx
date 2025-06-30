import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import axiosInstance from "../Hooks/axiosInstance";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userLoading, setUserLoading] = useState(false);

  const login = async (email, password) => {
    const res = await axiosInstance.post("/api/auth/login", { email, password });
    const { token, user } = res.data;
    localStorage.setItem("token", token);
    setUser(user);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

useEffect(() => {
  setUserLoading(true);
  const token = localStorage.getItem("token");

  if (token) {
    axiosInstance
      .get("/api/auth/profile")
      .then((res) => {
        setUser(res.data.user);
        setUserLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setUserLoading(false);
      });
  } else {
    setUserLoading(false);
  }
}, []);


  return (
    <AuthContext.Provider value={{ user,userLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

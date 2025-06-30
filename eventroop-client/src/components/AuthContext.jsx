import { createContext, useContext, useEffect, useState } from "react";
import axiosInstance from "../Hooks/axiosInstance";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userLoading, setUserLoading] = useState(true); // default true

  const login = async (email, password) => {
    setUserLoading(true); // Login start
    try {
      const res = await axiosInstance.post("/api/auth/login", { email, password });
      const { token, user } = res.data;
      localStorage.setItem("token", token);
      setUser(user);
    } catch (error) {
      console.error("Login failed", error);
    } finally {
      setUserLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setUser(null);
        setUserLoading(false);
        return;
      }

      try {
        const res = await axiosInstance.get("/api/auth/profile");
        setUser(res.data.user);
      } catch (error) {
        console.error("Failed to fetch profile", error);
        setUser(null);
      } finally {
        setUserLoading(false);
      }
    };

    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ user, userLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

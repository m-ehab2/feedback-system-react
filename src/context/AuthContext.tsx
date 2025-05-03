import React, { createContext, useContext, useState, useEffect } from "react";
import { loginUser } from "../services/authService";

interface AuthContextType {
  isAuthenticated: boolean;
  userName: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  token: string | null;
}


interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [userName, setUserName] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);

  // Check for token on initial load
  useEffect(() => {
    const storedToken = localStorage.getItem("auth_token");
    const storedUserName = localStorage.getItem("auth_user_name");

    if (storedToken && storedUserName) {
      setToken(storedToken);
      setUserName(storedUserName);
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (email: string, password: string) => {
    const { token, name } = await loginUser(email, password);

    localStorage.setItem("auth_token", token);
    localStorage.setItem("auth_user_name", name);

    setToken(token);
    setUserName(name);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("auth_user_name");

    setToken(null);
    setUserName(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, userName, login, logout, token }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

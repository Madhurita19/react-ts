import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { getLoggedInUser } from "./api/api";

interface AuthContextType {
  userRole: string | null;
  setUserRole: React.Dispatch<React.SetStateAction<string | null>>;
  profileImage: string | null;
  setProfileImage: React.Dispatch<React.SetStateAction<string | null>>;
  loadingUser: boolean;
  logout: () => void;
}


const AuthContext = createContext<AuthContextType | undefined>(undefined);





export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [userRole, setUserRole] = useState<string | null>(null);
  const [profileImage, setProfileImage] = useState<string | null>(localStorage.getItem("profileImage"));
  const [loadingUser, setLoadingUser] = useState(true);

  useEffect(() => {
  const token = localStorage.getItem("token");
  if (!token) {
    setLoadingUser(false);
    return;
  }

  const fetchRole = async () => {
    try {
      const user = await getLoggedInUser();
      if (user && user.role) {
        setUserRole(user.role);
      } else {
        setUserRole(null);
      }
    } catch (error) {
      setUserRole(null);
    } finally {
      setLoadingUser(false);
    }
  };

  fetchRole();
}, []);


  const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("profileImage");
  setUserRole(null);
  setProfileImage(null);
};

  return (
    <AuthContext.Provider value={{ userRole, setUserRole, profileImage, setProfileImage, loadingUser, logout }}>
  {children}
</AuthContext.Provider>

  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

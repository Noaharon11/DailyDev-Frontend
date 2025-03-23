import { createContext, useContext, useState, useEffect } from "react";
import { IUser } from "../types/index";
import { logoutUser as logoutUserService } from "../services/user-service";

export interface UserContextType {
  currentUser: IUser | null;
  isAuthenticated: boolean;
  setCurrentUser: (user: IUser | null) => void;
  setIsAuthenticated: (value: boolean) => void;
  logoutUser: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // Initialize user from localStorage if available
  const [currentUser, setCurrentUser] = useState<IUser | null>(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return !!localStorage.getItem("user");
  });

  // Keep localStorage in sync with currentUser
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem("user", JSON.stringify(currentUser));
      setIsAuthenticated(true);
    } else {
      localStorage.removeItem("user");
      setIsAuthenticated(false);
    }
  }, [currentUser]);

  const logoutUser = async () => {
    await logoutUserService(); // API call to logout on server
    setCurrentUser(null);
    setIsAuthenticated(false);
    localStorage.clear();
  };

  return (
    <UserContext.Provider
      value={{
        currentUser,
        isAuthenticated,
        setCurrentUser,
        setIsAuthenticated,
        logoutUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser must be used inside a UserProvider");
  return context;
};

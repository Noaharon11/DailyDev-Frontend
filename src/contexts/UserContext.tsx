import { createContext, useContext, useState } from "react";
import { IUser } from "../types";
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
  const [currentUser, setCurrentUser] = useState<IUser | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const logoutUser = async () => {
    await logoutUserService(); // ✅ שימוש בפונקציה מהשרת
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

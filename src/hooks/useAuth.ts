import { useEffect } from "react";
import { IUser } from "../types";

export const useAuth = (setUser: (user: IUser) => void) => {
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, [setUser]);
};

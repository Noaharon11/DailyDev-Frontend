// import { useNavigate } from "react-router-dom";
// import { registerUser } from "../services/user-service";
// import { IUser } from "../types";
// import Alert from "../components/Alert";

// export const useRegister = () => {
//   const navigate = useNavigate();

//   const register = async (data: {
//     username: string;
//     email: string;
//     password: string;
//     avatar?: File | null;
//   }): Promise<{ success: boolean; user?: IUser }> => {
//     try {
//       const formData = new FormData();
//       formData.append("username", data.username);
//       formData.append("email", data.email);
//       formData.append("password", data.password);
//       if (data.avatar) {
//         formData.append("avatar", data.avatar);
//       }

//       const { user } = await registerUser(formData);
//       Alert("Registration successful!", "success");
//       navigate("/dashboard");

//       return { success: true, user };
//     } catch {
//       Alert("Registration failed. Please try again.", "error");
//       return { success: false };
//     }
//   };

//   return { register };
// };

import { useState } from "react";
import { registerUser } from "../services/user-service";
import { uploadFile } from "../services/file-service";
import { IUser } from "../types";

export const useRegister = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const register = async ({
    username,
    email,
    password,
    avatar,
  }: {
    username: string;
    email: string;
    password: string;
    avatar?: File | null;
  }): Promise<{ success: boolean; user?: IUser }> => {
    setLoading(true);
    setError(null);

    try {
      let avatarUrl: string | undefined;

      if (avatar) {
        avatarUrl = await uploadFile(avatar);
        console.log("Image uploaded:", avatarUrl);
      }

      const { user } = await registerUser({
        username,
        email,
        password,
        avatar: avatarUrl,
      });

      console.log("User registered:", user);
      return { success: true, user };
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Registration failed";
      console.error("Registration error:", err);
      setError(errorMessage);
      return { success: false };
    } finally {
      setLoading(false);
    }
  };

  return { register, loading, error };
};

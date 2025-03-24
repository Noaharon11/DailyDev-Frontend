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
    imageUrl: imageFile,
  }: {
    username: string;
    email: string;
    password: string;
    imageUrl?: File | null;
  }): Promise<{ success: boolean; user?: IUser }> => {
    setLoading(true);
    setError(null);

    try {
      let uploadedImageUrl: string | undefined;

      if (imageFile) {
        uploadedImageUrl = await uploadFile(imageFile);
        console.log("Image uploaded:", uploadedImageUrl);
      }

      const { user } = await registerUser({
        username,
        email,
        password,
        imageUrl: uploadedImageUrl,
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

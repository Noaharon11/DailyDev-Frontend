import apiClient from "./api-client";

// ✅ Upload user avatar
export const uploadUserAvatar = async (userId: string, file: File) => {
  const formData = new FormData();
  formData.append("avatar", file); // 🔥 השדה הנכון לפי השרת של לי

  const response = await apiClient.put<string>(
    `/user/profile?userId=${userId}`,
    formData,
    {
      headers: { "Content-Type": "multipart/form-data" },
    }
  );

  return response.data; // ✅ מחזיר את ה-URL של התמונה החדשה
};

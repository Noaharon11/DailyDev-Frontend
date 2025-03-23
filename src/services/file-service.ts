import apiClient from "./api-client";

export const uploadFile = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await apiClient.post<{ url: string }>("/files", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data.url;
};

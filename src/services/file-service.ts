import apiClient from "./api-client";

interface UploadResponse {
  url: string;
}

export const uploadFile = async (file: File): Promise<string> => {
  if (!file.type.startsWith("image/")) {
    throw new Error("Please upload an image file");
  }

  if (file.size > 5 * 1024 * 1024) {
    throw new Error("File size should be less than 5MB");
  }

  const formData = new FormData();
  formData.append("file", file);

  const response = await apiClient.post<UploadResponse>("/file", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  if (!response.data.url) {
    throw new Error("Failed to get image URL from server");
  }

  return response.data.url;
};

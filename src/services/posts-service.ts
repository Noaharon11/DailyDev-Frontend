import apiClient from "./api-client";
import { IPost } from "../types/index";

// Fetch all posts with pagination (optional)
export const fetchAllPosts = async (page: number = 1): Promise<IPost[]> => {
  const response = await apiClient.get<IPost[]>("/posts", { params: { page } });
  return response.data;
};

// Fetch post by ID
export const fetchPostById = async (postId: string): Promise<IPost> => {
  const response = await apiClient.get<IPost>(`/posts/${postId}`);
  return response.data;
};

// Create a new post
export const createPost = async (
  content: string,
  image?: File
): Promise<IPost> => {
  const formData = new FormData();
  formData.append("content", content);
  if (image) formData.append("file", image);

  const response = await apiClient.post<IPost>("/posts", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

// Update an existing post
export const updatePost = async (
  postId: string,
  content?: string,
  image?: File
): Promise<IPost> => {
  const formData = new FormData();
  if (content) formData.append("content", content);
  if (image) formData.append("file", image);

  const response = await apiClient.put<IPost>(`/posts/${postId}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

// Like or unlike a post (toggle)
export const toggleLikePost = async (
  postId: string
): Promise<{ likes: number }> => {
  const response = await apiClient.post<{ likes: number }>(
    `/posts/${postId}/like`
  );
  return response.data;
};

// Delete a post
export const deletePost = async (postId: string): Promise<void> => {
  await apiClient.delete(`/posts/${postId}`);
};

// get all posts by user
export const fetchPostsByUser = async (userId: string): Promise<IPost[]> => {
  const response = await apiClient.get<IPost[]>(`/posts/user/${userId}`);
  return response.data;
};

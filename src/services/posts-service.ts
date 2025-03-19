import apiClient from "./api-client";
import { IPost } from "../types";

// Fetch all posts
export const fetchAllPosts = async (): Promise<IPost[]> => {
  try {
    const response = await apiClient.get<IPost[]>("/posts");
    return response.data;
  } catch (error) {
    console.error("Failed to fetch posts:", error);
    throw error;
  }
};

// Fetch posts by user
export const fetchPostsByUser = async (userId: string): Promise<IPost[]> => {
  try {
    const response = await apiClient.get<IPost[]>(`/posts/user/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch user posts:", error);
    throw error;
  }
};

// Create a new post
export const createPost = async (
  content: string,
  image?: File
): Promise<IPost> => {
  try {
    const formData = new FormData();
    formData.append("content", content);
    if (image) {
      formData.append("image", image);
    }

    const response = await apiClient.post<IPost>("/posts", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Failed to create post:", error);
    throw error;
  }
};

// Like a post
export const likePost = async (postId: string): Promise<IPost> => {
  try {
    const response = await apiClient.post<IPost>(`/posts/${postId}/like`);
    return response.data;
  } catch (error) {
    console.error("Failed to like post:", error);
    throw error;
  }
};

// Unlike a post
export const unlikePost = async (postId: string): Promise<IPost> => {
  try {
    const response = await apiClient.post<IPost>(`/posts/${postId}/unlike`);
    return response.data;
  } catch (error) {
    console.error("Failed to unlike post:", error);
    throw error;
  }
};

// Delete a post
export const deletePost = async (postId: string): Promise<void> => {
  try {
    await apiClient.delete(`/posts/${postId}`);
  } catch (error) {
    console.error("Failed to delete post:", error);
    throw error;
  }
};

import apiClient from "./api-client";
import { IComment } from "../types";

// Fetch comments for a post
export const fetchCommentsByPost = async (
  postId: string
): Promise<IComment[]> => {
  try {
    const response = await apiClient.get<IComment[]>(
      `/posts/${postId}/comments`
    );
    return response.data;
  } catch (error) {
    console.error("Failed to fetch comments:", error);
    throw error;
  }
};

// Add a new comment
export const addComment = async (
  postId: string,
  content: string
): Promise<IComment> => {
  try {
    const response = await apiClient.post<IComment>(
      `/posts/${postId}/comments`,
      {
        content,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Failed to add comment:", error);
    throw error;
  }
};

// Like a comment
export const likeComment = async (commentId: string): Promise<IComment> => {
  try {
    const response = await apiClient.post<IComment>(
      `/comments/${commentId}/like`
    );
    return response.data;
  } catch (error) {
    console.error("Failed to like comment:", error);
    throw error;
  }
};

// Unlike a comment
export const unlikeComment = async (commentId: string): Promise<IComment> => {
  try {
    const response = await apiClient.post<IComment>(
      `/comments/${commentId}/unlike`
    );
    return response.data;
  } catch (error) {
    console.error("Failed to unlike comment:", error);
    throw error;
  }
};

// Delete a comment
export const deleteComment = async (commentId: string): Promise<void> => {
  try {
    await apiClient.delete(`/comments/${commentId}`);
  } catch (error) {
    console.error("Failed to delete comment:", error);
    throw error;
  }
};

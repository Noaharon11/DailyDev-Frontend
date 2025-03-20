import apiClient from "./api-client";
import { IComment } from "../types/index";

// Fetch comments for a specific post
export const fetchCommentsByPost = async (
  postId: string
): Promise<IComment[]> => {
  const response = await apiClient.get<IComment[]>("/comments", {
    params: { postId },
  });
  return response.data;
};

// Create a new comment
export const addComment = async (
  postId: string,
  content: string
): Promise<IComment> => {
  const response = await apiClient.post<IComment>("/comments", {
    postId,
    content,
  });
  return response.data;
};

// Update an existing comment
export const updateComment = async (
  commentId: string,
  content: string
): Promise<IComment> => {
  const response = await apiClient.put<IComment>(`/comments/${commentId}`, {
    content,
  });
  return response.data;
};

// Delete a comment
export const deleteComment = async (commentId: string): Promise<void> => {
  await apiClient.delete(`/comments/${commentId}`);
};

import apiClient from "./api-client";
import { IComment } from "../types/index";

// ✅ Fetch comments for a specific post
export const fetchCommentsByPost = async (
  postId: string
): Promise<IComment[]> => {
  try {
    const response = await apiClient.get<IComment[]>(`/comments/${postId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching comments for post ${postId}:`, error);
    throw new Error("Failed to fetch comments");
  }
};

// ✅ Create a new comment
export const addComment = async (
  postId: string,
  content: string
): Promise<IComment> => {
  try {
    const response = await apiClient.post<IComment>("/comments", {
      postId,
      content,
    });
    return response.data;
  } catch (error) {
    console.error(`Error adding comment to post ${postId}:`, error);
    throw new Error("Failed to add comment");
  }
};

// ✅ Update an existing comment
export const updateComment = async (
  commentId: string,
  content: string
): Promise<IComment> => {
  try {
    const response = await apiClient.put<IComment>(`/comments/${commentId}`, {
      content,
    });
    return response.data;
  } catch (error) {
    console.error(`Error updating comment ${commentId}:`, error);
    throw new Error("Failed to update comment");
  }
};

// ✅ Delete a comment
export const deleteComment = async (commentId: string): Promise<void> => {
  try {
    await apiClient.delete(`/comments/${commentId}`);
  } catch (error) {
    console.error(`Error deleting comment ${commentId}:`, error);
    throw new Error("Failed to delete comment");
  }
};

// ✅ Toggle like/unlike on a comment
export const toggleLikeComment = async (
  commentId: string
): Promise<{ likes: string[] }> => {
  try {
    const response = await apiClient.post<{ likes: string[] }>(
      `/comments/${commentId}/like`
    );
    return response.data;
  } catch (error) {
    console.error(`Error liking/unliking comment ${commentId}:`, error);
    throw new Error("Failed to toggle like on comment");
  }
};

// import apiClient, { CanceledError } from "./api-client";

// import { PostData } from "../components/Post";

// export { CanceledError };
// const getAllPosts = () => {
//   const abortController = new AbortController();
//   const req = apiClient.get<PostData[]>("studentpost", {
//     signal: abortController.signal,
//   });
//   return { req, abort: () => abortController.abort() };
// };

// export default { getAllPosts };

import apiClient from "./api-client";

export interface Post {
  id: number;
  title: string;
  content: string;
  author: string;
  createdAt: string;
}

// ✅ קבלת כל הפוסטים
export const getPosts = async () => {
  try {
    const response = await apiClient.get<Post[]>("/posts");
    return response.data;
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw error;
  }
};

// ✅ קבלת פוסט לפי ID
export const getPostById = async (id: number) => {
  try {
    const response = await apiClient.get<Post>(`/posts/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching post with ID ${id}:`, error);
    throw error;
  }
};

// ✅ יצירת פוסט חדש
export const createPost = async (post: Omit<Post, "id" | "createdAt">) => {
  try {
    const response = await apiClient.post<Post>("/posts", post);
    return response.data;
  } catch (error) {
    console.error("Error creating post:", error);
    throw error;
  }
};

// ✅ עדכון פוסט קיים
export const updatePost = async (id: number, post: Partial<Post>) => {
  try {
    const response = await apiClient.put<Post>(`/posts/${id}`, post);
    return response.data;
  } catch (error) {
    console.error(`Error updating post with ID ${id}:`, error);
    throw error;
  }
};

// ✅ מחיקת פוסט
export const deletePost = async (id: number) => {
  try {
    await apiClient.delete(`/posts/${id}`);
    console.log(`Post with ID ${id} deleted successfully`);
  } catch (error) {
    console.error(`Error deleting post with ID ${id}:`, error);
    throw error;
  }
};

import apiClient from "./api-client";

export interface Post {
  id: number;
  title: string;
  content: string;
  author: string;
  createdAt: string;
}

//getAllPosts
export const getPosts = async () => {
  try {
    const response = await apiClient.get<Post[]>("/posts");
    return response.data;
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw error;
  }
};

// getPostById
export const getPostById = async (id: number) => {
  try {
    const response = await apiClient.get<Post>(`/posts/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching post with ID ${id}:`, error);
    throw error;
  }
};

//createPost
export const createPost = async (post: Omit<Post, "id" | "createdAt">) => {
  try {
    const response = await apiClient.post<Post>("/posts", post);
    return response.data;
  } catch (error) {
    console.error("Error creating post:", error);
    throw error;
  }
};

//updatePost
export const updatePost = async (id: number, post: Partial<Post>) => {
  try {
    const response = await apiClient.put<Post>(`/posts/${id}`, post);
    return response.data;
  } catch (error) {
    console.error(`Error updating post with ID ${id}:`, error);
    throw error;
  }
};

//deletePost
export const deletePost = async (id: number) => {
  try {
    await apiClient.delete(`/posts/${id}`);
    console.log(`Post with ID ${id} deleted successfully`);
  } catch (error) {
    console.error(`Error deleting post with ID ${id}:`, error);
    throw error;
  }
};

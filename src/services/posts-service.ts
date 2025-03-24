import apiClient from "./api-client";
import { IPost, ILikeUser } from "../types/index";
import { head } from "axios";

// Fetch all posts (supports pagination)
export const fetchAllPosts = async (page: number = 1): Promise<IPost[]> => {
  try {
    const response = await apiClient.get<IPost[]>("/posts", {
      params: { page },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw new Error("Failed to fetch posts");
  }
};

// Fetch a single post by ID
export const fetchPostById = async (postId: string): Promise<IPost> => {
  try {
    const response = await apiClient.get<IPost>(`/posts/${postId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching post ${postId}:`, error);
    throw new Error("Failed to fetch the post");
  }
};

export const createPost = async (
  content: string,
  image?: string
): Promise<IPost> => {
  const response = await apiClient.post<IPost>(
    "/posts",
    {
      content,
      title: content,
      image,
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );

  const post = response.data;

  return {
    ...post,
    image: post.image,
  };
};

// Update an existing post (supports updating text & image)
export const updatePost = async (
  postId: string,
  content?: string,
  image?: File
): Promise<IPost> => {
  try {
    const formData = new FormData();
    if (content) formData.append("content", content);
    if (image) formData.append("file", image);

    // const response = await apiClient.put<IPost>(`/posts/${postId}`, formData, {
    //   headers: { "Content-Type": "multipart/form-data" },
    // });
    const response = await apiClient.put<IPost>(`/posts/${postId}`, {
      content,
      title: content,
    });
    return response.data;
  } catch (error) {
    console.error(`Error updating post ${postId}:`, error);
    throw new Error("Failed to update post");
  }
};

// // Like or unlike a post (toggle)
// export const toggleLikePost = async (
//   postId: string
// ): Promise<{ likes: (string | IPost)[] }> => {
//   try {
//     const response = await apiClient.post<{ likes: (string | IPost)[] }>(
//       `/posts/${postId}/like`
//     );
//     return response.data;
//   } catch (error) {
//     console.error(`Error liking post ${postId}:`, error);
//     throw new Error("Failed to toggle like on post");
//   }
// };

// Like a post
export const likePost = async (
  postId: string,
  userId: string
): Promise<void> => {
  try {
    await apiClient.post(`/posts/${postId}/like`, null, {
      params: { userId },
    });
  } catch (error) {
    console.error("Error liking post:", error);
    throw error;
  }
};

// Unlike a post
export const unlikePost = async (
  postId: string,
  userId: string
): Promise<void> => {
  try {
    await apiClient.post(`/posts/${postId}/unlike`, null, {
      params: { userId },
    });
  } catch (error) {
    console.error("Error unliking post:", error);
    throw error;
  }
};

// Get likes for a post
export const getLikes = async (postId: string): Promise<ILikeUser[]> => {
  try {
    const response = await apiClient.get(`/posts/${postId}/likes`);
    return response.data as ILikeUser[];
  } catch (error) {
    console.error(`Error fetching likes for post ${postId}:`, error);
    throw error;
  }
};

// Delete a post
export const deletePost = async (postId: string): Promise<void> => {
  try {
    await apiClient.delete(`/posts/${postId}`);
  } catch (error) {
    console.error(`Error deleting post ${postId}:`, error);
    throw new Error("Failed to delete post");
  }
};

//  Fetch all posts by a specific user
// export const fetchPostsByUser = async (userId: string): Promise<IPost[]> => {
//   try {
//     const response = await apiClient.get<IPost[]>(`/posts/user/${userId}`);
//     return response.data;
//   } catch (error) {
//     console.error(`Error fetching posts for user ${userId}:`, error);
//     throw new Error("Failed to fetch user's posts");
//   }
// };

export const fetchPostsByUser = async (userId: string): Promise<IPost[]> => {
  try {
    const response = await apiClient.get<IPost[]>("/posts", {
      params: { owner: userId },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching posts by user:", error);
    throw new Error("Failed to fetch posts by user");
  }
};

import apiClient from "./api-client";
import { IUser, IPost } from "../types";

// Define a combined type to use safely in the frontend
export type SearchResult =
  | (IUser & { type: "user" })
  | (IPost & { type: "post" });

/**
 * Search for users and posts using a single query
 * @param query - the search term entered by the user
 * @returns Array of users and posts with type field
 */
export const searchAll = async (query: string): Promise<SearchResult[]> => {
  try {
    const response = await apiClient.get<SearchResult[]>("/search", {
      params: { q: query },
    });
    return response.data;
  } catch (error) {
    console.error("Error during search:", error);
    throw new Error("Search failed");
  }
};

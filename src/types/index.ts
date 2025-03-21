// ✅ Updated types/index.ts - Fully aligned with backend

export interface IUser {
  _id: string;
  username?: string;
  email: string;
  imageUrl?: string;
  bio?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface IPost {
  _id: string;
  author: IUser | string;
  content: string;
  imageUrl?: string;
  likes: (string | IUser)[]; // Users who liked the post
  commentsCount?: number; // Total number of comments on the post
  createdAt?: string;
  updatedAt?: string;
}

export interface IComment {
  _id: string;
  ownerId: string;
  postId: string;
  content: string;
  likes: string[]; // Array of user IDs who liked the comment
  createdAt?: string;
  updatedAt?: string;
}

// ✅ Fixed `AuthResponse` - Now includes `user`
export interface AuthResponse {
  user: IUser; // Now it includes the user object
  accessToken: string;
  refreshToken: string;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  _id: string;
  email: string;
  username: string;
}

export interface ISearchResult {
  id: string;
  name: string;
  type: "post" | "user";
  link: string;
}

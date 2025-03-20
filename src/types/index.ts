// types/index.ts

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
  likes: (string | IUser)[];
  commentsCount?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface IComment {
  _id: string;
  ownerId: string;
  postId: string;
  content: string;
  likes: string[];
  createdAt?: string;
  updatedAt?: string;
}

export interface AuthResponse {
  _id: string;
  email: string;
  accessToken: string;
  refreshToken: string;
}

export interface ErrorResponse {
  message: string;
  status: number;
}

export interface IUser {
  _id: string;
  username: string;
  email: string;
  password?: string;
  imgUrl?: string;
  bio?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface IPost {
  _id: string;
  owner: string;
  content: string;
  image?: string;
  likes: number;
  commentsCount: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface IComment {
  _id: string;
  owner: string;
  postId: string;
  content: string;
  likes: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface AuthResponse {
  user: IUser;
  accessToken: string;
  refreshToken: string;
}

export interface ErrorResponse {
  message: string;
  status: number;
}

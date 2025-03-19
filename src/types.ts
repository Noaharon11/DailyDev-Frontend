export interface IUser {
  _id?: string;
  username: string;
  email: string;
  password?: string;
  avatar?: string;
  bio?: string;
  refreshTokens?: string[];
  posts?: string[];
}

export interface IPost {
  _id: string;
  title: string;
  content: string;
  owner: string;
  likes: number;
  commentsCount: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface IComment {
  _id: string;
  postId: string;
  owner: string;
  content: string;
  createdAt?: string;
}

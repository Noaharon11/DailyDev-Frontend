export interface IUser {
  username: string;
  email: string;
  password?: string;
  imgUrl?: string;
  _id?: string;
  accessToken?: string;
  refreshToken?: string;
}

export interface IPost {
  id: string;
  username: string;
  text: string;
  imgUrl?: string;
  likes: number;
  comments: IComment[];
}

export interface IComment {
  id: string;
  username: string;
  text: string;
}

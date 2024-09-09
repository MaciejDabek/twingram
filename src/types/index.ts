import { Models } from "appwrite";

export type INewUser = {
  name: string;
  email: string;
  username: string;
  password: string;
};

export type IUpdateUser = {
  file: File[];
  name: string;
  username: string;
  imageId: string;
  imageUrl: string;
  bio: string;
};

export type IUser = Models.Document & {
  accountId: string;
  name: string;
  username: string;
  email: string;
  imageId: string;
  imageUrl: string;
  bio: string;
  posts?: IPost[];
  saves?: (Models.Document & { post: IPost })[];
  likes?: (Models.Document & { post: IPost })[];
  follower?: (Models.Document & { follower: IUser })[];
  followed?: (Models.Document & { followed: IUser })[];
};

export type INewPost = {
  creatorId: string;
  caption: string;
  location: string;
  tags: string;
  file: File[];
};

export type IUpdatePost = {
  caption: string;
  file: File[];
  location: string;
  tags: string;
  imageId: string;
  imageUrl: string;
};

export type IPost = Models.Document & {
  creator: IUser;
  caption: string;
  location: string;
  tags: string[];
  imageId: string;
  imageUrl: string;
  saves?: (Models.Document & { user: IUser })[];
  likes?: (Models.Document & { user: IUser })[];
};

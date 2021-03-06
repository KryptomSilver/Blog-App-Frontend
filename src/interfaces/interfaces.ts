import { ChangeEvent, FormEvent } from "react";
import rootReducer from "../redux/reducers/index";

export type InputChange = ChangeEvent<
  HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
>;
export type FormSubmit = FormEvent<HTMLFormElement>;
export type RootStore = ReturnType<typeof rootReducer>;

export interface IParams {
  page: string;
  slug: string;
}
export interface IUserLogin {
  account: string;
  password: string;
}
export interface IUserRegister extends IUserLogin {
  name: string;
  cf_password: string;
}
export interface IUser extends IUserLogin {
  _id: string;
  avatar: string;
  createdAt: string;
  name: string;
  role: string;
  type: string;
  updatedAt: string;
}
export interface IUserInfo extends IUserRegister {
  avatar: string | File;
}
export interface IProps {
  title: string;
  body: string | string[];
  bgColor: string;
}
export interface ICategory {
  createdAt: string;
  name: string;
  updatedAt: string;
  _id: string;
}
export interface IAuth {
  msg?: string;
  access_token?: string;
  user?: IUser;
}
export interface IAlert {
  loading?: boolean;
  success?: string | string[];
  errors?: string | string[];
}
export interface IBlog {
  _id?: string;
  user: string | IUser;
  title: string;
  content: string;
  description: string;
  thumbnail: string | File;
  category: string;
  createdAt: string;
}
export interface IComment {
  _id?: string;
  user: IUser;
  blog_id: string;
  blog_user_id: string;
  content: string;
  replyCM?: IComment[];
  replyUser?: string;
  createdAt: string;
}

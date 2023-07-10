import axios, { AxiosResponse } from "axios";
import { environment } from "../utils";

const { axa_user_profiles, axa_users } = environment;

export interface User {
  username: string;
  uid: string;
}

export interface UserDetail {
  userUid: string;
  address: string;
  birthdate: string;
}

export const getUsers = async (): Promise<AxiosResponse<User[], any>> => {
  return await axios.get<User[]>(axa_users);
};

export const getUserDetails = async (): Promise<
  AxiosResponse<UserDetail[], any>
> => {
  return await axios.get<UserDetail[]>(axa_user_profiles);
};

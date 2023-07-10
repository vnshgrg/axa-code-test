import { AxiosError } from "axios";
import { User, getUsers } from "../service/api";

export const login = async (username: string): Promise<User | null> => {
  try {
    // Assignment has specific requirement that I call these api every time
    const { data: users } = await getUsers();
    const user = users.find((user) => user.username === username) || null;
    return user;
  } catch (err) {
    console.log("There was an error");
    const error = err as AxiosError;
    throw error.message || "An error occurred";
  }
};

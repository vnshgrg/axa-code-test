import { AxiosError } from "axios";
import { UserDetail, getUserDetails } from "../service/api";

export const userDetails = async (id: string): Promise<UserDetail | null> => {
  try {
    // Assignment has specific requirement that I call these api every time
    const { data: users } = await getUserDetails();
    const user = users.find((user) => user.userUid === id) || null;
    return user;
  } catch (err) {
    console.log("There was an error");
    const error = err as AxiosError;
    throw error.message || "An error occurred";
  }
};

import { User, UserLoginParams } from "../types/user";
import { api } from "./api";

export const login = async (credentials: UserLoginParams): Promise<User> => {
  const response = await api.post("/auth/login", credentials);
  return response.data as User;
};

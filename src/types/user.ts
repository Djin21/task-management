export interface User {
  id: number;
  name?: string;
  email: string;
  password: string;
  token?: string;
}

export interface UserLoginParams {
  email: string;
  password: string;
}

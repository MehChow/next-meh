export interface User {
  id: string;
  role: "User" | "Admin";
  username: string;
  email: string;
}

export interface AuthRequest {
  email: string;
  password: string;
}

export interface AuthResponse<T> {
  data: T;
  status: number;
}

export type AuthErrorType = {
  message: string;
  code: string;
  statusCode?: number;
};

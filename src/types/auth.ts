export interface User {
  id: string;
  role: "User" | "Admin";
  username: string;
}

export interface AuthRequest {
  username: string;
  password: string;
}

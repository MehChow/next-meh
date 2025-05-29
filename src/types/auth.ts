export interface User {
  id: string;
  role: "User" | "Admin";
  username: string;
}

export interface AuthRequest {
  username: string;
  password: string;
}

export interface AuthResponse {
  userResponse: User;
}

export interface RefreshTokenResponse {
  accessToken: string;
  refreshToken: string;
}

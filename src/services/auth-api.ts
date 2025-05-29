import apiClient from "@/lib/axios";
import { AuthRequest, AuthResponse, RefreshTokenResponse } from "@/types/auth";
// AxiosResponse is for accessing the normal response data like status
import { AxiosResponse } from "axios";

const authApi = {
  login: async (data: AuthRequest): Promise<AxiosResponse<AuthResponse>> => {
    const response = await apiClient.post("/api/auth/login", data);
    return response;
  },
  authCheck: async () => {
    const response = await apiClient.get("/api/auth");
    return response.status === 200;
  },
  register: async (data: AuthRequest): Promise<AuthResponse> => {
    const response = await apiClient.post("/api/auth/register", data);
    return response.data;
  },
  logout: async () => {
    const response = await apiClient.post("/api/auth/logout");
    return response.data;
  },
  refreshAccessToken: async (
    refreshToken?: string
  ): Promise<RefreshTokenResponse> => {
    const headers: Record<string, string> = {};

    if (refreshToken) {
      headers["Cookie"] = `refreshToken=${refreshToken}`;
    }

    const response = await apiClient.post(
      "/api/auth/refresh-token",
      undefined,
      { headers }
    );
    return response.data;
  },
  getUser: async () => {
    const response = await apiClient.get("/api/auth/get-userinfo");
    return response.data;
  },
};

export default authApi;

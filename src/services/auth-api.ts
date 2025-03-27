import apiClient from "@/lib/axios";
import { SignInRequest, SignInResponse } from "@/types/auth";

const authApi = {
  authCheck: async () => {
    const response = await apiClient.get("/api/auth");
    return response.status === 200;
  },
  refreshAccessToken: async (refreshToken?: string): Promise<SignInResponse> => {
    const headers: Record<string, string> = {};
    if (refreshToken) {
      headers["Cookie"] = `refreshToken=${refreshToken}`;
    }
    const response = await apiClient.post("/api/auth/refresh-token", undefined, {
      headers,
    });

    return response.data;
  },
  login: async (data: SignInRequest): Promise<SignInResponse> => {
    const response = await apiClient.post("/api/auth/login", data);
    return response.data;
  },
  logout: async () => {
    const response = await apiClient.post("/api/auth/logout");
    return response.data;
  },
};

export default authApi;

import apiClient from "@/lib/axios";
import { AuthRequest, User } from "@/types/auth";
// AxiosResponse is for accessing the normal response data like status
import { AxiosResponse } from "axios";

const authApi = {
  login: async (data: AuthRequest): Promise<AxiosResponse<User>> => {
    const response = await apiClient.post("/api/auth/login", data);
    // return response to also access the status
    return response;
  },
  register: async (data: AuthRequest): Promise<AxiosResponse<User>> => {
    const response = await apiClient.post("/api/auth/register", data);
    return response;
  },
  authCheck: async () => {
    const response = await apiClient.get("/api/auth");
    return response.status === 200;
  },
  logout: async () => {
    const response = await apiClient.post("/api/auth/logout");
    return response.data;
  },
  refreshAccessToken: async () => {
    const response = await apiClient.post("/api/auth/refresh-token");
    return response.status === 200;
  },
  getUser: async (): Promise<AxiosResponse<User>> => {
    const response = await apiClient.get("/api/auth/get-userinfo");
    return response;
  },
};

export default authApi;

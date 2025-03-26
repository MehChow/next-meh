import apiClient from "@/lib/axios";
import { SignInRequest, SignInResponse } from "@/types/auth";
import { toast } from "sonner";

const authModel = {
  // Auth test check
  authCheck: async () => {
    const response = await apiClient.get("/api/auth");
    if (response.status === 200) {
      toast.success("You are authenticated!!");
    }
  },
  /* Manually attach the refreshToken to header here, because this API will be called
    inside NextJs's middleware, which is in a server context, and axios will not
    automatically send cookies even though withCredentials is set to true
    */
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

export default authModel;

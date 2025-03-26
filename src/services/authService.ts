import apiClient from "@/lib/axios";

interface SignInRequest {
  username: string;
  password: string;
}

interface SignInResponse {
  accessToken: string;
}

const authService = {
  // Will return the accessToken
  login: async (data: SignInRequest): Promise<SignInResponse> => {
    const response = await apiClient.post("/api/auth/login", data);
    return response.data;
  },
  // Will return the accessToken too upon successful refresh
  refreshAccessToken: async (refreshToken?: string): Promise<SignInResponse> => {
    /* Manually attach the refreshToken to header here, because this API will be called
    inside NextJs's middleware, which is in a server context, and axios will not
    automatically send cookies even though withCredentials is set to true
    */
    const headers: Record<string, string> = {};
    if (refreshToken) {
      headers["Cookie"] = `refreshToken=${refreshToken}`;
    }
    const response = await apiClient.post("/api/auth/refresh-token", undefined, {
      headers,
    });
    return response.data;
  },
  // Auth health check
  authCheck: async () => {
    const response = await apiClient.get("/api/auth");
    console.log({ response });
    return response.data;
  },
};

export default authService;

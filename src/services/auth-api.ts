import apiClient from "@/lib/axios";
import { AuthErrorType, AuthRequest, AuthResponse, User } from "@/types/auth";
import { AxiosError } from "axios";

const authApi = {
  login: async (data: AuthRequest): Promise<AuthResponse<User>> => {
    try {
      const response = await apiClient.post("/api/auth/login", data);
      return {
        data: response.data,
        status: response.status,
      };
    } catch (error) {
      throw handleApiError(error);
    }
  },
  register: async (data: AuthRequest): Promise<AuthResponse<User>> => {
    try {
      const response = await apiClient.post("/api/auth/register", data);
      return {
        data: response.data,
        status: response.status,
      };
    } catch (error) {
      throw handleApiError(error);
    }
  },
  googleLogin: async (code: string): Promise<AuthResponse<User>> => {
    try {
      const response = await apiClient.post("/api/auth/google", { code });
      return {
        data: response.data,
        status: response.status,
      };
    } catch (error) {
      throw handleApiError(error);
    }
  },
  getUser: async (): Promise<AuthResponse<User>> => {
    try {
      const response = await apiClient.get("/api/auth/get-userinfo");
      return {
        data: response.data,
        status: response.status,
      };
    } catch (error) {
      throw handleApiError(error);
    }
  },
  refreshAccessToken: async (): Promise<boolean> => {
    try {
      const response = await apiClient.post("/api/auth/refresh-token");
      return response.status === 200;
    } catch (error) {
      throw handleApiError(error);
    }
  },
  authCheck: async (): Promise<boolean> => {
    try {
      const response = await apiClient.get("/api/auth");
      return response.status === 200;
    } catch (error) {
      throw handleApiError(error);
    }
  },
  logout: async (): Promise<void> => {
    try {
      await apiClient.post("/api/auth/logout");
    } catch (error) {
      throw handleApiError(error);
    }
  },
};

// Error handler function
const handleApiError = (error: unknown): AuthErrorType => {
  if (error instanceof AxiosError) {
    // Handle Axios errors
    if (error.response) {
      // Server responded with error
      return {
        message: error.response.data?.message || "Authentication failed",
        code: error.response.data?.code || "AUTH_ERROR",
        statusCode: error.response.status,
      };
    }
    if (error.request) {
      // Network error
      return {
        message: "Network error occurred",
        code: "NETWORK_ERROR",
        statusCode: 0,
      };
    }
  }
  // Unknown error
  return {
    message: "An unexpected error occurred",
    code: "UNKNOWN_ERROR",
    statusCode: 0,
  };
};

export default authApi;

import authService from "@/services/auth-service";
import axios from "axios";

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  timeout: 10000,
  // Sending cookies automatically with each request
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    // Unauthorized
    if (error.response?.status === 401) {
      console.log("AXIOS: You are UNAUTHORIZED!!! Attempting to refresh token...");

      // Handle refresh access token for API request
      try {
        const { accessToken } = await authService.refreshAccessToken();
        if (!accessToken) {
          console.log("AXIOS: Failed to refresh access token");
          return Promise.reject(error);
        }

        // If success, retry the request
        return apiClient.request(error.config);
      } catch (refreshError) {
        console.error("AXIOS: Refresh token failed:", refreshError);
        if (typeof window !== "undefined") {
          window.location.href = "/auth";
        }
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;

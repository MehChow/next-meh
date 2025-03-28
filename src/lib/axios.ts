import authApi from "@/services/auth-api";
import axios from "axios";
import { toast } from "sonner";

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  timeout: 10000,
  // Sending cookies automatically with each request
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

const getErrorMessage = (error: any) => {
  if (error.response && error.response.data) {
    return error.response.data;
  }

  return "An unexpected error occurred. Please try again later.";
};

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response) {
      // get error info
      const { status } = error.response;
      const errorMessage = getErrorMessage(error);

      // Handle 400 error cases:
      if (status === 400) {
        toast.error(errorMessage);
        return Promise.reject({ status, message: errorMessage });
      } else if (status === 401 && errorMessage !== "INVALID_REFRESH_TOKEN") {
        /* Handle 401 errors. If the error is not INVALID_REFRESH_TOKEN, attempt to refresh
         * the access token. Because if the refresh token is invalid, the user is not authorized */
        console.log("AXIOS: You are UNAUTHORIZED!!! Attempting to refresh token...");

        // Handle refresh access token for API request
        try {
          const { tokenResponse } = await authApi.refreshAccessToken();
          if (!tokenResponse.accessToken) {
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
    }

    toast.error("A network error occurred. Please check your connection and try again.");
    return Promise.reject(error);
  }
);

export default apiClient;

import useAuthStore from "@/store/auth-store";
import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:5216",
  timeout: 10000,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use(
  (config) => {
    // Append token automatically
    const accessToken = useAuthStore.getState().accessToken;
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => {
    console.log({ response });
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      console.log("You are UNAUTHORIZED!!!");
      try {
      } catch (error) {}
    }
    return Promise.reject(error);
  }
);

export default apiClient;

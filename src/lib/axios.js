import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5216",
  timeout: 10000,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => {
    console.log({ response });
    return response;
  },
  (error) => Promise.reject(error)
);

export default api;

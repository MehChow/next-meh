import authModel from "@/model/auth-model";
import { SignInRequest } from "@/types/auth";

const authService = {
  login: async (data: SignInRequest) => authModel.login(data),
  refreshAccessToken: async (refreshToken?: string) => authModel.refreshAccessToken(refreshToken),
  authCheck: async () => authModel.authCheck(),
  logout: async () => authModel.logout(),
};

export default authService;

import authApi from "@/services/auth-api";
import { User } from "@/types/auth";
import { create } from "zustand";

interface UserState {
  user: User | null;
  isLoading: boolean;
  setUser: (user: User) => void;
  clearUser: () => void;
  fetchUser: () => Promise<void>;
}

export const useUserStore = create<UserState>()((set) => ({
  user: null,
  isLoading: true,
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),
  fetchUser: async () => {
    set({ isLoading: true });

    try {
      const user = await authApi.getUser();
      console.log({ user });
      set({ user });
    } catch (error) {
      console.log("Not logged in, or both tokens are expired");
    } finally {
      set({ isLoading: false });
    }
  },
}));

export default useUserStore;

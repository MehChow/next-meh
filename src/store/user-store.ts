import authApi from "@/services/auth-api";
import { User } from "@/types/auth";
import { create } from "zustand";

interface UserState {
  user: User | null;
  authStatus: "IDLE" | "LOADING" | "AUTHED" | "UNAUTHED";
  setUser: (user: User) => void;
  fetchUser: () => Promise<void>;
  clearUser: () => void;
}

export const useUserStore = create<UserState>((set) => {
  return {
    user: null,
    authStatus: "IDLE",
    setUser: (user) => set({ user, authStatus: "AUTHED" }),
    fetchUser: async () => {
      set({ authStatus: "LOADING" });
      try {
        const user = await authApi.getUser();
        set({ user, authStatus: "AUTHED" });
      } catch (error) {
        console.error("Failed to fetch user:", error);
        set({ authStatus: "UNAUTHED" });
      }
    },
    clearUser: () => set({ user: null, authStatus: "UNAUTHED" }),
  };
});

export default useUserStore;

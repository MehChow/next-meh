import { create } from "zustand";

interface AuthStore {
  accessToken: string | null;
  setAccessToken: (accessToken: string) => void;
  clearAccessToken: () => void;
}

const useAuthStore = create<AuthStore>((set) => ({
  accessToken: null,
  setAccessToken: (accessToken) => set({ accessToken }),
  clearAccessToken: () => set({ accessToken: null }),
}));

export default useAuthStore;

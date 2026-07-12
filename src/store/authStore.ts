import { create } from "zustand";

interface User {
  id: number;
  username: string;
  email: string;
}

interface AuthStore {
  user: User | null;
  token: string | null;

  setUser: (user: User) => void;
  setToken: (token: string) => void;

  logout: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: JSON.parse(localStorage.getItem("user") || "null"),

  token: localStorage.getItem("token"),

  setUser: (user) => set({ user }),

  setToken: (token) => set({ token }),

  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    set({
      user: null,
      token: null,
    });
  },
}));
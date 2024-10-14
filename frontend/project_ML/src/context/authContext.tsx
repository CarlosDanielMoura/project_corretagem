import { create } from "zustand";
import jwt from "jsonwebtoken";
import { api } from "../api";

// Definindo o tipo do sessionData
interface SessionData {
  email: string;
  password: string;
  o_location: string;
  is_sensitive_data_access: boolean;
  latitude?: number;
  longitude?: number;
  actionAccess: string;
}

// Tipando a store
interface AuthStore {
  auth: null | { token: string };
  login: (sessionData: SessionData) => Promise<void>;
  logout: () => void;
}

const useAuthStore = create<AuthStore>((set) => ({
  auth: null,
  login: async (sessionData: SessionData) => {
    try {
      const response = await api.post("/login", sessionData);
      const token = response.data.user.token;

      localStorage.setItem("token", token);
      set({ auth: { token } });
    } catch (error) {
      throw error;
    }
  },
  logout: () => {
    localStorage.removeItem("token");
    set({ auth: null });
  },
}));

export default useAuthStore;

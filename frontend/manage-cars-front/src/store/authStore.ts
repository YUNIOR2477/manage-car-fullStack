import type { UserLogin, UserRegister } from "@/types/Users";
import { create } from "zustand";
import { jwtDecode } from "jwt-decode";
import { login, register } from "@/services/authApi";
import { handleApiError } from "@/utils/axiosError";

interface AuthState {
  isLoading: boolean;
  loadingError: string | null;
  userToken: string | null;
  handleLogin: (user: UserLogin) => Promise<void>;
  handleRegister: (user: UserRegister) => Promise<void>;
  logout: () => void;
  syncToken: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isLoading: false,
  loadingError: null,
  userToken: localStorage.getItem("userToken") || null,

  syncToken: () => {
    const savedToken = localStorage.getItem("userToken");
    if (!savedToken) {
      localStorage.setItem("isAuthenticated", "false");
      localStorage.removeItem("userRole");
      set({ userToken: null });
      return;
    }

    try {
      const decodedToken: { roles?: string; exp?: number } =
        jwtDecode(savedToken);
      if (!decodedToken.exp || decodedToken.exp * 1000 < Date.now()) {
        localStorage.removeItem("userToken");
        localStorage.setItem("isAuthenticated", "false");
        localStorage.removeItem("userRole");
        set({ userToken: null });
        return;
      }

      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("userRole", decodedToken.roles || "");
      set({ userToken: savedToken });
    } catch (error) {
      console.error("Error al decodificar el token:", error);
      localStorage.removeItem("userToken");
      localStorage.setItem("isAuthenticated", "false");
      localStorage.removeItem("userRole");
      set({ userToken: null });
    }
  },

  handleLogin: async (user: UserLogin) => {
    set({ isLoading: true, loadingError: null });
    try {
      const token = await login(user);
      localStorage.setItem("userToken", token);
      const decodedToken: { roles: string } = jwtDecode(token);
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("userRole", decodedToken.roles);
      set({ userToken: token, isLoading: false });
    } catch (error: unknown) {
      set({
        loadingError: handleApiError(error),
        isLoading: false,
        userToken: null,
      });
      localStorage.setItem("isAuthenticated", "false");
      localStorage.removeItem("userRole");
    }
  },

  handleRegister: async (user: UserRegister) => {
    set({ isLoading: true, loadingError: null });
    try {
      await register(user);
      const userLogin: UserLogin = {
        email: user.email,
        password: user.password,
      };
      const token = await login(userLogin);
      localStorage.setItem("userToken", token);
      const decodedToken: { roles: string } = jwtDecode(token);
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("userRole", decodedToken.roles);
      set({ userToken: token, isLoading: false });
    } catch (error: unknown) {
      set({
        loadingError: handleApiError(error),
        isLoading: false,
        userToken: null,
      });
      localStorage.setItem("isAuthenticated", "false");
      localStorage.removeItem("userRole");
    }
  },

  logout: () => {
    localStorage.removeItem("userToken");
    localStorage.setItem("isAuthenticated", "false");
    localStorage.removeItem("userRole");
    set({ userToken: null });
  },
}));

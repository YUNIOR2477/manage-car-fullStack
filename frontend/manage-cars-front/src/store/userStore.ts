// src/store/carStore.ts
import { create } from "zustand";
import type { User, UserUpdate } from "@/types/Users";
import {
  changeRoleUserById,
  deleteUserById,
  getAllUsers,
  getMyProfile,
  getUserById,
  updateProfile,
} from "@/services/UserApi";
import { handleApiError } from "@/utils/axiosError";

interface UserState {
  isLoading: boolean;
  loadingError: string | null;
  currentUser: User | null;
  userProfile: User | null;
  users: User[] | null;
  totalPages: number;
  currentPage: number;
  totalElements: number;
  size: number;

  handleChangeRole: (userId: string, role: string) => Promise<void>;
  handleDeleteUser: (userId: string) => Promise<void>;
  handleUpdateProfile: (user: UserUpdate) => Promise<boolean>;
  fetchMyProfile: () => Promise<User | null>;
  fetchUserById: (userId: string) => Promise<User | null>;
  fetchAllUsers: (page: number) => Promise<User[] | null>;
}

export const useUserStore = create<UserState>((set) => ({
  isLoading: false,
  loadingError: null,
  currentUser: null,
  userProfile: null,
  users: null,
  totalPages: 0,
  currentPage: 0,
  totalElements: 0,
  size: 0,

  handleChangeRole: async (userId, role) => {
    set({ isLoading: true, loadingError: null });
    try {
      await changeRoleUserById(userId, role);
      set({ currentUser: null, isLoading: false });
    } catch (error: unknown) {
      set({ loadingError: handleApiError(error), isLoading: false });
    }
  },

  handleDeleteUser: async (carId) => {
    set({ isLoading: true, loadingError: null });
    try {
      await deleteUserById(carId);
      set({ currentUser: null, isLoading: false });
    } catch (error: unknown) {
      set({ loadingError: handleApiError(error), isLoading: false });
    }
  },

  handleUpdateProfile: async (user) => {
    set({ isLoading: true, loadingError: null });
    try {
      await updateProfile(user);
      set({ currentUser: null, isLoading: false });
      return true;
    } catch (error: unknown) {
      set({ loadingError: handleApiError(error), isLoading: false });
      return false;
    }
  },

  fetchMyProfile: async () => {
    set({ isLoading: true, loadingError: null });
    try {
      const user = await getMyProfile();
      set({ userProfile: user, isLoading: false });
      return user;
    } catch (error: unknown) {
      set({ loadingError: handleApiError(error), isLoading: false });
      return null;
    }
  },

  fetchUserById: async (userId) => {
    set({ isLoading: true, loadingError: null });
    try {
      const user = await getUserById(userId);
      set({ currentUser: user, isLoading: false });
      return user;
    } catch (error: unknown) {
      set({ loadingError: handleApiError(error), isLoading: false });
      return null;
    }
  },

  fetchAllUsers: async (page) => {
    set({ isLoading: true, loadingError: null });
    try {
      const data = await getAllUsers(page);
      set({
        users: data.content,
        currentPage: data.number,
        totalPages: data.totalPages,
        totalElements: data.totalElements,
        size: data.size,
        isLoading: false,
      });
      return data.content;
    } catch (error: unknown) {
      set({ loadingError: handleApiError(error), isLoading: false });
      return null;
    }
  },
}));

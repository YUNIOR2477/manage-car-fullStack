import type { User, UserPaginated, UserUpdate } from "@/types/Users";
import { handleAxiosError } from "@/utils/axiosError";
import { API_BASE_URL } from "@/utils/baseUrl";
import axios, { type AxiosResponse } from "axios";

const api = axios.create({
  baseURL: `${API_BASE_URL}/users`,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("userToken");
  if (!token) {
    console.warn("Intento de solicitud sin token.");
    return Promise.reject(new Error("Usuario no autenticado."));
  }
  config.headers = config.headers || {};
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const getMyProfile = async (): Promise<User> => {
  try {
    const response: AxiosResponse<User> = await api.get("/my-profile");
    return response.data;
  } catch (error) {
    handleAxiosError(error, "obtener la informacion del perfil del usuario.");
    throw error;
  }
};

export const getUserById = async (userId: string): Promise<User> => {
  try {
    const response: AxiosResponse<User> = await api.get(`/${userId}`);
    return response.data;
  } catch (error) {
    handleAxiosError(error, "obtener la informacion del usuario.");
    throw error;
  }
};

export const updateProfile = async (user: UserUpdate): Promise<void> => {
  try {
    await api.put(`/update-profile`, user);
  } catch (error) {
    handleAxiosError(error, "actualizar los datos del usuario.");
    throw error;
  }
};

//Metodos para el Admin

export const changeRoleUserById = async (
  userId: string,
  role: string
): Promise<void> => {
  try {
    await api.put(`/change-role/${userId}`, { params: { role } });
  } catch (error) {
    handleAxiosError(error, "actualizar el rol del usuario.");
    throw error;
  }
};

export const deleteUserById = async (userId: string): Promise<void> => {
  try {
    await api.delete(`/${userId}`);
  } catch (error) {
    handleAxiosError(error, "eliminar el usuario.");
    throw error;
  }
};

export const getAllUsers = async (page = 0): Promise<UserPaginated> => {
  try {
    const response: AxiosResponse<UserPaginated> = await api.get("", {
      params: { page },
    });
    return response.data;
  } catch (error) {
    handleAxiosError(error, "obtener la informacion de todos los usuarios.");
    throw error;
  }
};

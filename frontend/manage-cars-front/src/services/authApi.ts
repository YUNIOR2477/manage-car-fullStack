import type { UserLogin, UserRegister } from "@/types/Users";
import { API_BASE_URL } from "@/utils/baseUrl";
import axios, { type AxiosResponse } from "axios";

const api = axios.create({
  baseURL: `${API_BASE_URL}/auth`,
});

export const login = async (user: UserLogin): Promise<string> => {
  try {
    const response: AxiosResponse<string> = await api.post("/login", user);
    return response.data;
  } catch (error: unknown) {
    console.error("Error al iniciar sesion: ", error);
    throw error;
  }
};

export const register = async (user: UserRegister): Promise<string> => {
  try {
    const response: AxiosResponse<string> = await api.post("/register", user);
    return response.data;
  } catch (error: unknown) {
    console.error("Error al registrar el usuario: ", error);
    throw error;
  }
};

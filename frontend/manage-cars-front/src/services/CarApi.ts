import type { Car, CarPaginated, SaveCar } from "@/types/Car";
import { handleAxiosError } from "@/utils/axiosError";
import { API_BASE_URL } from "@/utils/baseUrl";
import axios, { type AxiosResponse } from "axios";

const api = axios.create({
  baseURL: `${API_BASE_URL}/cars`,
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

export const saveCar = async (car: SaveCar): Promise<Car> => {
  try {
    const response: AxiosResponse<Car> = await api.post("", car);
    return response.data;
  } catch (error) {
    handleAxiosError(error, "guardar los datos del carro.");
    throw error;
  }
};

export const updateCar = async (car: SaveCar, id: string): Promise<Car> => {
  try {
    const response: AxiosResponse<Car> = await api.put(`/${id}`, car);
    return response.data;
  } catch (error) {
    handleAxiosError(error, "actualizar los datos del carro.");
    throw error;
  }
};

export const deleteCar = async (id: string): Promise<void> => {
  try {
    await api.delete(`/${id}`);
  } catch (error) {
    handleAxiosError(error, "eliminar el carro.");
    throw error;
  }
};

export const getCarById = async (carId: string): Promise<Car> => {
  try {
    const response: AxiosResponse<Car> = await api.get(`/${carId}`);
    return response.data;
  } catch (error) {
    handleAxiosError(error, "obtener la informacion del carro.");
    throw error;
  }
};

export const getAllCars = async (page = 0): Promise<CarPaginated> => {
  try {
    const response: AxiosResponse<CarPaginated> = await api.get("", {
      params: { page },
    });
    return response.data;
  } catch (error) {
    handleAxiosError(error, "obtener la informacion de todos los carros.");
    throw error;
  }
};

export const getCarByPlateNumber = async (
  plateNumber: string
): Promise<Car> => {
  try {
    const response: AxiosResponse<Car> = await api.get(`/plate/${plateNumber}`);
    return response.data;
  } catch (error) {
    handleAxiosError(error, "obtener la informacion del carro.");
    throw error;
  }
};

export const getCarsByYear = async (
  year: string,
  page = 0
): Promise<CarPaginated> => {
  try {
    const response: AxiosResponse<CarPaginated> = await api.get(
      `/year/${year}`,
      {
        params: { page },
      }
    );
    return response.data;
  } catch (error) {
    handleAxiosError(error, "obtener la informacion de todos los carros.");
    throw error;
  }
};

export const getCarsByBrand = async (
  brand: string,
  page = 0
): Promise<CarPaginated> => {
  try {
    const response: AxiosResponse<CarPaginated> = await api.get(
      `/brand/${brand}`,
      {
        params: { page },
      }
    );
    return response.data;
  } catch (error) {
    handleAxiosError(error, "obtener la informacion de todos los carros.");
    throw error;
  }
};

export const getCarsByUserById = async (
  userId: string,
  page = 0
): Promise<CarPaginated> => {
  try {
    const response: AxiosResponse<CarPaginated> = await api.get(
      `/user/${userId}`,
      {
        params: { page },
      }
    );
    return response.data;
  } catch (error) {
    handleAxiosError(
      error,
      "obtener la informacion de todos los carros del usuario."
    );
    throw error;
  }
};

export const getCarsByModel = async (
  model: string,
  page = 0
): Promise<CarPaginated> => {
  try {
    const response: AxiosResponse<CarPaginated> = await api.get(
      `/model/${model}`,
      {
        params: { page },
      }
    );
    return response.data;
  } catch (error) {
    handleAxiosError(error, "obtener la informacion de todos los carros.");
    throw error;
  }
};

export const getCountAllCars = async (): Promise<number> => {
  try {
    const response: AxiosResponse<number> = await api.get(`/count`);
    return response.data;
  } catch (error) {
    handleAxiosError(error, "obtener la informacion de todos los carros.");
    throw error;
  }
};

export const getCountAllCarsByUserId = async (
  userId: string
): Promise<number> => {
  try {
    const response: AxiosResponse<number> = await api.get(`/count/${userId}`);
    return response.data;
  } catch (error) {
    handleAxiosError(error, "obtener la informacion de todos los carros.");
    throw error;
  }
};

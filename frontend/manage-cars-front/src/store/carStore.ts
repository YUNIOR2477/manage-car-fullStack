// src/store/carStore.ts
import { create } from "zustand";
import type { Car, SaveCar } from "@/types/Car";
import {
  deleteCar,
  getAllCars,
  getCarById,
  getCarByPlateNumber,
  getCarsByBrand,
  getCarsByModel,
  getCarsByUserById,
  getCarsByYear,
  getCountAllCars,
  getCountAllCarsByUserId,
  saveCar,
  updateCar,
} from "@/services/CarApi";
import { handleApiError } from "@/utils/axiosError";

interface CarState {
  isLoading: boolean;
  loadingError: string | null;
  currentCar: Car | null;
  cars: Car[] | null;
  totalPages: number;
  currentPage: number;
  totalElements: number;
  size: number;

  handleSaveCar: (car: SaveCar) => Promise<Car | null>;
  handleUpdateCar: (carId: string, car: SaveCar) => Promise<Car | null>;
  handleDeleteCar: (carId: string) => Promise<boolean>;
  fetchCarById: (carId: string) => Promise<Car | null>;
  fetchAllCars: (page: number) => Promise<Car[] | null>;
  fetchCarByPlateNumber: (plateNumber: string) => Promise<Car | null>;
  fetchCarByYear: (year: string, page: number) => Promise<Car[] | null>;
  fetchCarByBrand: (brand: string, page: number) => Promise<Car[] | null>;
  fetchCarByModel: (model: string, page: number) => Promise<Car[] | null>;
  fetchCarByUserId: (userId: string, page: number) => Promise<Car[] | null>;
  fetchCountAllCars: () => Promise<number | null>;
  fetchCountAllCarsByUserId: (userId: string) => Promise<number | null>;
}

export const useCarStore = create<CarState>((set) => ({
  isLoading: false,
  loadingError: null,
  currentCar: null,
  cars: null,
  totalPages: 0,
  currentPage: 0,
  totalElements: 0,
  size: 0,

  handleSaveCar: async (car) => {
    set({ isLoading: true, loadingError: null });
    try {
      const saved = await saveCar(car);
      set({ currentCar: saved, isLoading: false });
      return saved;
    } catch (error: unknown) {
      set({ loadingError: handleApiError(error), isLoading: false });
      return null;
    }
  },

  handleUpdateCar: async (carId, car) => {
    set({ isLoading: true, loadingError: null });
    try {
      const updated = await updateCar(car, carId);
      set({ currentCar: updated, isLoading: false });
      return updated;
    } catch (error: unknown) {
      set({ loadingError: handleApiError(error), isLoading: false });
      return null;
    }
  },

  handleDeleteCar: async (carId) => {
    set({ isLoading: true, loadingError: null });
    try {
      await deleteCar(carId);
      set({ currentCar: null, isLoading: false });
      return true;
    } catch (error: unknown) {
      set({ loadingError: handleApiError(error), isLoading: false });
      return false;
    }
  },

  fetchCarById: async (carId) => {
    set({ isLoading: true, loadingError: null });
    try {
      const car = await getCarById(carId);
      set({ currentCar: car, isLoading: false, totalPages: 0 });
      return car;
    } catch (error: unknown) {
      set({ loadingError: handleApiError(error), isLoading: false });
      return null;
    }
  },

  fetchAllCars: async (page) => {
    set({ isLoading: true, loadingError: null });
    try {
      const data = await getAllCars(page);
      set({
        cars: data.content,
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

  fetchCarByPlateNumber: async (plateNumber) => {
    set({ isLoading: true, loadingError: null });
    try {
      const car = await getCarByPlateNumber(plateNumber);
      set({ currentCar: car, isLoading: false, totalPages: 0 });
      return car;
    } catch (error: unknown) {
      set({ loadingError: handleApiError(error), isLoading: false });
      return null;
    }
  },

  fetchCarByYear: async (year, page) => {
    set({ isLoading: true, loadingError: null });
    try {
      const data = await getCarsByYear(year, page);
      set({
        cars: data.content,
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

  fetchCarByBrand: async (brand, page) => {
    set({ isLoading: true, loadingError: null });
    try {
      const data = await getCarsByBrand(brand, page);
      set({
        cars: data.content,
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

  fetchCarByModel: async (model, page) => {
    set({ isLoading: true, loadingError: null });
    try {
      const data = await getCarsByModel(model, page);
      set({
        cars: data.content,
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

  fetchCarByUserId: async (userId, page) => {
    set({ isLoading: true, loadingError: null });
    try {
      const data = await getCarsByUserById(userId, page);
      set({
        cars: data.content,
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

  fetchCountAllCars: async () => {
    set({ isLoading: true, loadingError: null });
    try {
      const data = await getCountAllCars();
      set({
        isLoading: false,
      });
      return data;
    } catch (error: unknown) {
      set({ loadingError: handleApiError(error), isLoading: false });
      return null;
    }
  },
  fetchCountAllCarsByUserId: async (userId) => {
    set({ isLoading: true, loadingError: null });
    try {
      const data = await getCountAllCarsByUserId(userId);
      set({
        isLoading: false,
      });
      return data;
    } catch (error: unknown) {
      set({ loadingError: handleApiError(error), isLoading: false });
      return null;
    }
  },
}));

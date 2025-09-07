export interface SaveCar {
  brand: string;
  model: string;
  year: string;
  plateNumber: string;
  color: string;
}

export interface Car {
  id: string;
  brand: string;
  model: string;
  year: string;
  plateNumber: string;
  color: string;
  userId: string;
  registerAt:string;
}

export interface CarPaginated {
  content: Car[];
  totalPages: number;
  totalElements: number;
  last: boolean;
  first: boolean;
  size: number;
  number: number;
}
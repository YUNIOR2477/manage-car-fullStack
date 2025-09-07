export interface UserLogin {
  email: string;
  password: string;
}

export interface UserRegister {
  name: string;
  surname: string;
  email: string;
  password: string;
}

export interface UserUpdate {
  name: string;
  surname: string;
  email: string;
}

export interface User {
  id: string;
  name: string;
  surname: string;
  email: string;
  carsIds: string[];
  role:string;
  createdAt:string;
  lastLogin:string;
}

export interface UserPaginated {
  content: User[];
  totalPages: number;
  totalElements: number;
  last: boolean;
  first: boolean;
  size: number;
  number: number;
}
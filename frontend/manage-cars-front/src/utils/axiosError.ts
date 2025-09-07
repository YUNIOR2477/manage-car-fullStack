import axios, { AxiosError } from "axios";

export const handleAxiosError = (error: unknown, action: string): void => {
  if (error instanceof AxiosError) {
    console.error(
      `Error del servidor al ${action}:`,
      error.response?.data?.message || "Error desconocido"
    );
  } else if (error instanceof Error) {
    console.error(`Error al ${action}:`, error.message);
  } else {
    console.error(`Error inesperado al ${action}:`, error);
  }
};

export function handleApiError(error: unknown): string {
  if (axios.isAxiosError(error)) {
    return (
      error.response?.data?.message || "Error desconocido desde el servidor."
    );
  }

  if (error instanceof Error) {
    return error.message || "Error inesperado en la solicitud.";
  }

  return "Ocurrió un error inesperado.";
}

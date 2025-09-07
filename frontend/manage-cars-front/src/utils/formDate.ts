export const formatDate = (dateString: string | undefined): string => {
  if (!dateString) return "Fecha no disponible"; 

  const date = new Date(dateString);
  return date.toISOString().split("T")[0]; 
};

export const formatDateTime = (dateString: string | undefined): string => {
  if (!dateString) return "Fecha no disponible"; 

  const date = new Date(dateString);
  return date.toISOString().replace("T", " ").substring(0, 19); // Extrae YYYY-MM-DD HH:mm:ss
};

export const formatDateTimeForAPI = (dateString: string): string => {
  if (!dateString) return "";

  const date = new Date(dateString);
  return date.toISOString(); // Genera formato correcto "YYYY-MM-DDTHH:mm:ss.SSSZ"
};
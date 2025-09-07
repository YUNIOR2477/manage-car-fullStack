import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useCarStore } from "@/store/carStore";
import { useTheme } from "@/components/Theme-provider";
import CarLogin from "@/assets/images/CarLogin.jpg";
import { formatDateTime } from "@/utils/formDate";
import { useUserStore } from "@/store/userStore";
import { LoadingSkeleton } from "@/components/LoadingSkeleton";
import { useNavigate } from "react-router-dom";

const MyCars = () => {
  const { fetchCarByUserId, cars, isLoading, totalPages } = useCarStore();
  const { fetchMyProfile } = useUserStore();
  const [page, setPage] = useState(0);
  const navigate = useNavigate();
  const { theme } = useTheme();

  const systemTheme = (className: string) =>
    theme === "system" ? className : "";

  useEffect(() => {
    localStorage.setItem("navigationBar", "Tus vehiculos");
    const setAllCars = async () => {
      const user = await fetchMyProfile();
      if (user) {
        await fetchCarByUserId(user.id, page);
      }
    };
    setAllCars();
  }, [fetchCarByUserId, fetchMyProfile, page]);

  return (
    <div className={`rounded-xl shadow-md p-12 text-primary h-full`}>
      <h2 className="text-3xl font-bold text-center text-primary mb-6">
        🚗 Todos tus vehiculos
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-8">
        {isLoading ? (
          LoadingSkeleton()
        ) : cars != null ? (
          cars.map((car) => (
            <Card
              key={car.id}
              onClick={() => navigate(`/user/cars/${car.id}`)}
              className={`p-4 shadow-md border border-muted bg-primary-foreground hover:bg-primary-foreground/50 cursor-pointer rounded-lg ${systemTheme(
                "bg-background/50"
              )}`}
            >
              <img
                src={CarLogin}
                alt={`${car.brand} ${car.model}`}
                className="w-full h-40 object-cover rounded-md "
              />
              <h3 className="text-xl font-bold text-primary ">
                {car.brand} - {car.model}
              </h3>
              <CardContent className="p-0 -mt-4">
                <p className="text-sm text-muted-foreground">
                  <strong>Id:</strong> {car.id}
                </p>
                <p className="text-sm text-muted-foreground">
                  <strong>Año:</strong> {car.year}
                </p>
                <p className="text-sm text-muted-foreground">
                  <strong>Color:</strong> {car.color}
                </p>
                <p className="text-sm text-muted-foreground">
                  <strong>Placa:</strong> {car.plateNumber}
                </p>
                <p className="text-sm text-muted-foreground">
                  <strong>Creacion:</strong> {formatDateTime(car.registerAt)}
                </p>
              </CardContent>
            </Card>
          ))
        ) : (
          <p className="text-center text-muted-foreground col-span-full">
            No se encontraron vehículos.
          </p>
        )}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-8">
          <Button
            disabled={page === 0}
            onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
            className={`px-4 py-2 rounded-md ${systemTheme(
              "bg-green-500 hover:bg-green-600 text-white"
            )}`}
          >
            ⬅️ Anterior
          </Button>
          <span className="text-sm font-medium text-muted-foreground">
            Página {page + 1} de {totalPages}
          </span>
          <Button
            disabled={page + 1 >= totalPages}
            onClick={() => setPage((prev) => prev + 1)}
            className={`px-4 py-2 rounded-md ${systemTheme(
              "bg-green-500 hover:bg-green-600 text-white"
            )}`}
          >
            Siguiente ➡️
          </Button>
        </div>
      )}
    </div>
  );
};

export default MyCars;

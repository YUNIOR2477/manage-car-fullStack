import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useCarStore } from "@/store/carStore";
import { useTheme } from "@/components/Theme-provider";
import type { Car } from "@/types/Car";
import CarLogin from "@/assets/images/CarLogin.jpg";
import { formatDateTime } from "@/utils/formDate";
import { LoadingSkeleton } from "@/components/LoadingSkeleton";
import { useNavigate } from "react-router-dom";


const SearchCars = () => {
  const {
    fetchAllCars,
    fetchCarByBrand,
    fetchCarById,
    fetchCarByPlateNumber,
    fetchCarByYear,
    fetchCarByModel,
    isLoading,
    totalPages,
  } = useCarStore();

  const [searchType, setSearchType] = useState("all");
  const [searchValue, setSearchValue] = useState("");
  const [result, setResult] = useState<Car[]>([]);
  const [page, setPage] = useState(0);
  const navigate = useNavigate();
  const { theme } = useTheme();

  const systemTheme = (className: string) =>
    theme === "system" ? className : "";

  const handleSearch = async () => {
    switch (searchType) {
      case "id": {
        const carById: Car | null = await fetchCarById(searchValue);
        setResult(carById ? [carById] : []);
        setPage(0)
        break;
      }
      case "brand": {
        const carsByBrand = await fetchCarByBrand(searchValue, page);
        setResult(carsByBrand || []);
        setPage(0)
        break;
      }
      case "model": {
        const carsByModel = await fetchCarByModel(searchValue, page);
        setResult(carsByModel || []);
        setPage(0)
        break;
      }
      case "year": {
        const carsByYear = await fetchCarByYear(searchValue, page);
        setResult(carsByYear || []);
        setPage(0)
        break;
      }
      case "plate": {
        const carByPlate = await fetchCarByPlateNumber(searchValue);
        setResult(carByPlate ? [carByPlate] : []);
        setPage(0)
        break;
      }
      default: {
        const allCars = await fetchAllCars(page);
        setResult(allCars || []);
        setPage(0)
      }
    }
  };

  useEffect(() => {
    localStorage.setItem("navigationBar", "Buscar vehículos");
    const setAllCars = async () => {
      const data = await fetchAllCars(page)
      setResult(data || [])
    }
    setAllCars()
  }, [fetchAllCars, page]);

  return (
    <div className={`rounded-xl shadow-md p-12 text-primary h-full`}>

      <h2 className="text-3xl font-bold text-center text-primary mb-6">
        🔍 Busqueda de vehiculos
      </h2>

      <div className="flex gap-4 items-center">
        <select
          id="searchType"
          value={searchType}
          onChange={(e) => setSearchType(e.target.value)}
          className=" border border-primary/30  bg-primary text-primary-foreground rounded-md p-1.5 text-base "
        >
          <option value="all">Todos</option>
          <option value="id">Por ID</option>
          <option value="brand">Por Marca</option>
          <option value="model">Por Modelo</option>
          <option value="year">Por Año</option>
          <option value="plate">Por Placa</option>
        </select>

        <Input
          id="searchValue"
          type="text"
          placeholder="Selecciona un filtro de busqueda y ingresa el valor de búsqueda"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className="w-full border-primary/30 bg-card text-base"
        />

        <Button
          onClick={handleSearch}
          className={` font-semibold py-2 rounded-md shadow-md ${systemTheme(
            "bg-green-500 hover:bg-green-600 text-white"
          )}`}
        >
          {isLoading ? "⌛ Buscando..." : "🔎 Buscar"}
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-8">
        {isLoading? LoadingSkeleton(): result.length > 0 ? (
          result.map((car) => (
            <Card
              key={car.id}
              onClick={()=> navigate(`/user/cars/${car.id}`)}
              className={`p-4 shadow-md border border-muted bg-primary-foreground hover:bg-primary-foreground/50 cursor-pointer rounded-lg ${systemTheme("bg-background/50")}`}
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

      {totalPages > 1  && (
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

export default SearchCars;

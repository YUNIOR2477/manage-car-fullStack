import { useTheme } from "@/components/Theme-provider";
import ToastMessage from "@/components/ToastMessage";
import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCarStore } from "@/store/carStore";
import { useUserStore } from "@/store/userStore";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const InfoCar = () => {
  const {
    fetchCarById,
    handleDeleteCar,
    handleUpdateCar,
    currentCar,
    isLoading,
    loadingError,
  } = useCarStore();
  const { fetchUserById, currentUser } = useUserStore();
  const { carId } = useParams();
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");
  const [plateNumber, setPlateNumber] = useState("");
  const [color, setColor] = useState("");
  const [registerAt, setRegisterAt] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const loadAndSetCar = async () => {
      if (carId) {
        const car = await fetchCarById(carId);
        if (car) {
          setBrand(car.brand);
          setModel(car.model);
          setYear(car.year);
          setColor(car.color);
          setPlateNumber(car.plateNumber);
          setRegisterAt(car.registerAt);
          await fetchUserById(car.userId);
        }
      }
    };
    loadAndSetCar();
  }, [carId, fetchCarById, fetchUserById]);

  const handleUpdateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (currentCar) {
      const car = await handleUpdateCar(currentCar.id, {
        brand,
        model,
        year,
        plateNumber,
        color,
      });
      if (car === null) return;
      ToastMessage({
        type: "success",
        title: "Vehiculo actualizado correctamente 🏆🎉 ",
        description: `Se ha actualizado correctamente el vehiculo con placa: ${plateNumber}`,
      });
    }
  };

  const handleDeleteSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (carId) {
      const success = await handleDeleteCar(carId);
      if (!success) return;
      navigate("/user/cars/search");
      ToastMessage({
        type: "success",
        title: "Vehiculo eliminado correctamente 🚮 ",
        description: `Se ha eliminado correctamente el vehiculo con placa: ${plateNumber}`,
      });
    }
  };

  useEffect(() => {
    if (loadingError) {
      ToastMessage({
        type: "error",
        title: "Error",
        description: `${loadingError}`,
      });
    }
  }, [loadingError]);
  const { theme } = useTheme();

  const systemTheme = (className: string) => {
    return `${theme === "system" ? `${className}` : ""}`;
  };

  useEffect(() => {
    localStorage.setItem("navigationBar", "Informacion del vehiculo");
  }, []);

  return (
    <div className={`rounded-xl shadow-md p-10 text-primary h-full`}>
      <CardContent>
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-primary mb-7">
          ℹ️ informacion del vehiculo
        </h2>

        <form onSubmit={handleUpdateSubmit} className="space-y-5 px-25">
          {[
            {
              id: "brand",
              label: "Marca",
              value: brand,
              setter: setBrand,
              placeholder: "Ej. Toyota",
            },
            {
              id: "model",
              label: "Modelo",
              value: model,
              setter: setModel,
              placeholder: "Ej. Corolla",
            },
            {
              id: "year",
              label: "Año",
              value: year,
              setter: setYear,
              placeholder: "Ej. 2022",
            },
            {
              id: "plateNumber",
              label: "Placa",
              value: plateNumber,
              setter: setPlateNumber,
              placeholder: "Ej. ABC-123",
            },
            {
              id: "color",
              label: "Color",
              value: color,
              setter: setColor,
              placeholder: "Ej. Rojo",
            },
          ].map(({ id, label, value, setter, placeholder }) => (
            <div key={id} className="space-y-2">
              <Label
                htmlFor={id}
                className="text-sm sm:text-base font-medium text-foreground"
              >
                {label} del vehículo:
              </Label>
              <Input
                id={id}
                type="text"
                placeholder={placeholder}
                value={value}
                onChange={(e) => setter(e.target.value)}
                required
                className="w-full border-primary/30 bg-card text-sm sm:text-base"
              />
            </div>
          ))}
          <div className="space-y-2">
            <Label
              htmlFor="createBy"
              className="text-sm sm:text-base font-medium text-foreground"
            >
              Creado por:
            </Label>
            <Input
              id="createBy"
              type="text"
              readOnly
              value={currentUser?.email}
              className="w-full border-primary/30 bg-card text-sm sm:text-base"
            />
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="registerAt"
              className="text-sm sm:text-base font-medium text-foreground"
            >
              Fecha de registro:
            </Label>
            <Input
              id="registerAt"
              type="text"
              readOnly
              value={registerAt}
              className="w-full border-primary/30 bg-card text-sm sm:text-base"
            />
          </div>
          <Button
            type="submit"
            className={`w-full font-bold rounded-lg py-2 mt-2 shadow-lg transition-all text-base duration-200 ease-in-out hover:bg-primary/80 ${systemTheme(
              "bg-green-500 hover:bg-green-800 text-white"
            )}`}
            disabled={isLoading}
          >
            {isLoading ? "⌛ Actualizando..." : `🛠️ Actualizar vehiculo`}
          </Button>

          <Button
            onClick={handleDeleteSubmit}
            type="button"
            className={`w-full font-bold rounded-lg py-2 mt-2 shadow-lg bg-red-500 transition-all text-base duration-200 ease-in-out hover:bg-red-600`}
            disabled={isLoading}
          >
            {isLoading ? "⌛ Actualizando..." : `🗑️ Eliminar vehiculo`}
          </Button>
        </form>
      </CardContent>
    </div>
  );
};

export default InfoCar;

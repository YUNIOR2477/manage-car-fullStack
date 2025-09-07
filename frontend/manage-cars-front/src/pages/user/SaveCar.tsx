import { useTheme } from "@/components/Theme-provider";
import ToastMessage from "@/components/ToastMessage";
import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCarStore } from "@/store/carStore";
import { useEffect, useState } from "react";

const SaveCar = () => {
    const { handleSaveCar, isLoading, loadingError } = useCarStore();
    const [brand, setBrand] = useState("");
    const [model, setModel] = useState("");
    const [year, setYear] = useState("");
    const [plateNumber, setPlateNumber] = useState("");
    const [color, setColor] = useState("");

    const resetForm = () => {
        setBrand("");
        setModel("");
        setYear("");
        setPlateNumber("");
        setColor("");
    };

    const buttonSaveOnSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

      const success =  await handleSaveCar({ brand, model, year, plateNumber, color });

        if (success === null) return;

        resetForm();

        ToastMessage({
            type: "success",
            title: "Vehiculo guardado con éxito 🏆🎉 ",
            description: `Se ha guardado correctamente el vehiculo con placa: ${plateNumber}`,
        });
    };

    useEffect(() => {
        if (loadingError) {
            ToastMessage({
                type: "error",
                title: "Error al crear el proyecto",
                description: `${loadingError}`,
            });
        }
    }, [loadingError]);

    useEffect(() => {
        localStorage.setItem("navigationBar", "Guardar vehiculo");
    }, []);

    const { theme } = useTheme();

    const systemTheme = (className: string) => {
        return `${theme === "system" ? `${className}` : ""}`;
    };
    return (
        <div className={`rounded-xl shadow-md p-10 text-primary h-full`}>
            <CardContent>
                <h2 className="text-2xl sm:text-3xl font-bold text-center text-primary mb-7">
                    🚗 Guardar Nuevo vehiculo
                </h2>

                <form onSubmit={buttonSaveOnSubmit} className="space-y-5 px-25">
                    {[
                        { id: "brand", label: "Marca", value: brand, setter: setBrand, placeholder: "Ej. Toyota" },
                        { id: "model", label: "Modelo", value: model, setter: setModel, placeholder: "Ej. Corolla" },
                        { id: "year", label: "Año", value: year, setter: setYear, placeholder: "Ej. 2022" },
                        { id: "plateNumber", label: "Placa", value: plateNumber, setter: setPlateNumber, placeholder: "Ej. ABC-123" },
                        { id: "color", label: "Color", value: color, setter: setColor, placeholder: "Ej. Rojo" },
                    ].map(({ id, label, value, setter, placeholder }) => (
                        <div key={id} className="space-y-2">
                            <Label htmlFor={id} className="text-sm sm:text-base font-medium text-foreground">
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
                    <Button
                        type="submit"
                        className={`w-full font-bold rounded-lg py-2 mt-2 shadow-lg transition-all text-base duration-200 ease-in-out hover:bg-primary/80 ${systemTheme(
                            "bg-green-500 hover:bg-green-800 text-white"
                        )}`}
                        disabled={isLoading}
                    >
                        {isLoading ? "⌛ Guardando..." : `🛠️ Guardar vehiculo`}
                    </Button>
                </form>
            </CardContent>
        </div>
    );
};

export default SaveCar;

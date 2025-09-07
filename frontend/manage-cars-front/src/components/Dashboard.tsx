import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { useUserStore } from "@/store/userStore";
import { useCarStore } from "@/store/carStore";

const Dashboard = () => {
  const { userProfile } = useUserStore();
  const { fetchCountAllCars, fetchCountAllCarsByUserId } = useCarStore();
  const [name, setName] = useState("");
  const [globalCars, setGlobalCars] = useState(0);
  const [carsUser, setCarsUser] = useState(0);

  useEffect(() => {
    localStorage.setItem("navigationBar", "");
    localStorage.setItem("navigationTitle", "");
    if (userProfile) {
      setName(userProfile.name);
    }
  }, [userProfile]);

  useEffect(() => {
    const setCountCars = async () => {
      const global = await fetchCountAllCars();
      if (global) {
        setGlobalCars(global);
      }
      if (userProfile) {
        const local = await fetchCountAllCarsByUserId(userProfile.id);
        if (local) {
          setCarsUser(local);
        }
      }
    };
    setCountCars();
  }, [fetchCountAllCars, fetchCountAllCarsByUserId, userProfile]);

  return (
    <div className={`rounded-xl shadow-md p-12 text-primary h-full `}>
      <div>
        <h1 className="text-4xl font-bold tracking-tight text-primary">
          ¡Hola de nuevo, {name}! 👋
        </h1>
        <p className="text-muted-foreground mt-3 text-xl">
          Este es tu centro de control personal. Visualiza, gestiona y optimiza
          tu garaje digital con facilidad.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
        <Card className="shadow-md hover:shadow-lg transition-shadow duration-300 bg-background/60">
          <CardHeader>
            <CardTitle>🌐 Autos globales</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-extrabold text-primary">{globalCars}</p>
            <p className="text-sm text-muted-foreground">
              Vehículos registrados en toda la plataforma
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-md hover:shadow-lg transition-shadow duration-300  bg-background/60">
          <CardHeader>
            <CardTitle>🧍 Tus autos</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-extrabold text-primary">{carsUser}</p>
            <p className="text-sm text-muted-foreground">
              Vehículos vinculados a tu cuenta personal
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="text-sm text-center text-muted-foreground leading-relaxed mt-7">
        Tu garaje digital está diseñado para ofrecerte control total sobre tus
        vehículos, desde el registro hasta la gestion de los mismos.
        <br />
        <span className="font-semibold text-primary">
          ¡Administra con estilo, eficiencia y seguridad!
        </span>
      </div>
    </div>
  );
};

export default Dashboard;

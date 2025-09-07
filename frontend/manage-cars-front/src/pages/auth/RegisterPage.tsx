import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useTheme } from "@/components/Theme-provider";
import { useAuthStore } from "@/store/authStore";
import { useEffect, useState } from "react";
import { useUserStore } from "@/store/userStore";
import { useNavigate } from "react-router-dom";
import ToastMessage from "@/components/ToastMessage";
import CarLogin from "@/assets/images/CarLogin.jpg";

const RegisterPage = () => {
  const navigate = useNavigate();
  const { handleRegister, isLoading, loadingError } = useAuthStore();
  const { fetchMyProfile } = useUserStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("")
  const [surname, setSurname] = useState("")

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await handleRegister({ email, password, name, surname });
    const userData = await fetchMyProfile();

    if (userData) {
      if (userData.role === "ROLE_ADMIN") navigate("/admin");
      if (userData.role === "ROLE_USER") navigate("/user");
      ToastMessage({
        type: "success",
        title: "¡Registro exitoso! 🎉",
        description: `Bienvenido, ${userData.name}`,
      });

    }
  };

  useEffect(() => {
    if (loadingError) {
      ToastMessage({
        type: "error",
        title: "No se pudo completar el registro",
        description: `${loadingError}`,
      });

    }
  }, [loadingError])


  const { theme } = useTheme();
  const isSystemTheme = theme === "system";
  return (
    <Card className="w-full max-w-4xl mx-auto mt-4 shadow-xl border border-muted bg-primary-foreground/60 p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 items-center">
        <div className="hidden md:block h-full">
          <img
            src={CarLogin}
            alt="Auto moderno"
            className=" object-cover rounded-lg opacity-90 h-full w-full justify-center"
          />
        </div>

        <div className="p-4 sm:p-6">
          <form onSubmit={handleLoginSubmit} className=" space-y-4">
            <CardHeader className="space-y-3">
              <CardTitle className="text-2xl font-semibold text-center text-foreground">
                Regístrate para comenzar
              </CardTitle>
              <p className="text-sm text-muted-foreground text-center">
                Bienvenido a{" "}
                <span
                  className={`font-medium ${isSystemTheme ? "text-green-500" : "text-primary"
                    } `}
                >
                  AutoData
                </span>{" "}
                — Gestión inteligente de vehículos
              </p>
            </CardHeader>

            <CardContent className="space-y-3 mt-3">
              <div className="space-y-2">
                <Label htmlFor="name">Nombre:</Label>
                <Input
                  id="name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="surname">Apellido:</Label>
                <Input
                  id="surname"
                  type="text"
                  required
                  value={surname}
                  onChange={(e) => setSurname(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Correo electrónico:</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="ejemplo@autodata.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Contraseña:</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Crea una contraseña segura"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-2 mt-4">
              <Button
                type="submit"
                disabled={isLoading}
                className={`w-full ${isSystemTheme
                  ? "bg-green-500 hover:bg-green-600 text-white"
                  : ""
                  }`}
              >
                {isLoading ? "⏳ Registrando usuario..." : "✅ Crear cuenta"}

              </Button>

              <p className="text-xs text-muted-foreground text-center">
                ¿Ya tienes una cuenta?{" "}
                <span
                  onClick={() => navigate("/auth/login")}
                  className={`hover:underline  ${isSystemTheme ? "text-green-400" : "text-primary"
                    } cursor-pointer`}
                >
                  Inicia sesión
                </span>
              </p>
            </CardFooter>
          </form>
        </div>
      </div>
    </Card>
  );
};

export default RegisterPage;


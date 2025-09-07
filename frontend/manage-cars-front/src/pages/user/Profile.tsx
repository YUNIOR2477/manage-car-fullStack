import { useTheme } from "@/components/Theme-provider";
import ToastMessage from "@/components/ToastMessage";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUserStore } from "@/store/userStore";
import type { User } from "@/types/Users";
import { useEffect, useState } from "react";

const Profile = () => {
  const { userProfile, isLoading, loadingError, handleUpdateProfile } =
    useUserStore();
  const [profile, setProfile] = useState<User | null>();
  const { theme } = useTheme();
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      if (userProfile) {
        setProfile(userProfile);
        setName(userProfile.name);
        setSurname(userProfile.surname);
        setEmail(userProfile.email);
      }
    };
    fetchProfile();
  }, [userProfile]);

  useEffect(() => {
    if (loadingError) {
      ToastMessage({
        type: "error",
        title: "Error al obtener el perfil del usuario.",
        description: `${loadingError}`,
      });
    }
  }, [loadingError]);

  const handleUpdateProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const succes = await handleUpdateProfile({
      name,
      surname,
      email,
    });

    if (succes) {
      ToastMessage({
        type: "success",
        title: "Perfil actualizado correctamente",
        description: "Su perfil fue actualizado con exito 🎉",
      });
    }
  };

  const systemTheme = (className: string) => {
    return `${theme === "system" ? `${className}` : ""}`;
  };

  useEffect(() => {
    localStorage.setItem("navigationTitle", "Mi perfil");
    localStorage.setItem("navigationBar", "");
  }, []);
  return (
    <div className={`rounded-xl shadow-md p-6 text-primary h-full`}>
      <h2 className="text-2xl sm:text-3xl font-bold text-center text-primary my-8">
        👤 Informacion del perfil
      </h2>
      <CardContent className="space-y-4">
        <div className="flex items-center">
          <Avatar className="h-70 w-70 rounded-full">
            <AvatarFallback
              className={`rounded-lg text-primary-foreground text-7xl bg-primary font-bold  ${systemTheme(
                "bg-green-500"
              )}`}
            >
              {email.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <CardContent className="w-full">
            <form
              onSubmit={handleUpdateProfileSubmit}
              className="space-y-5 w-full"
            >
              <div className="flex gap-9">
                <div className="grid w-full gap-2">
                  <Label htmlFor="firstName" className="text-sm sm:text-base">
                    Nombre:
                  </Label>
                  <Input
                    id="firstName"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full border-primary/30 bg-card text-sm sm:text-base"
                  />
                </div>
                <div className="grid w-full gap-2">
                  <Label htmlFor="lastName" className="text-sm sm:text-base">
                    Apellido:
                  </Label>
                  <Input
                    id="surname"
                    type="text"
                    value={surname}
                    onChange={(e) => setSurname(e.target.value)}
                    className="w-full border-primary/30 bg-card text-sm sm:text-base"
                  />
                </div>
              </div>
              <div className="grid gap-2 md:col-span-2">
                <Label htmlFor="email" className="text-sm sm:text-base">
                  Correo:
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setSurname(e.target.value)}
                  className="w-full border-primary/30 bg-card text-sm sm:text-base"
                />
              </div>
              <div className="flex gap-9">
                <div className="grid w-full gap-2">
                  <Label htmlFor="position" className="text-sm sm:text-base">
                    Rol:
                  </Label>
                  <Input
                    id="role"
                    type="text"
                    readOnly
                    value={profile?.role}
                    className="w-full border-primary/30 bg-card text-sm sm:text-base"
                  />
                </div>
                <div className="grid w-full gap-2">
                  <Label htmlFor="phoneNumber" className="text-sm sm:text-base">
                    Fecha de creacion:
                  </Label>
                  <Input
                    id="createAt"
                    type="text"
                    readOnly
                    value={profile?.createdAt}
                    className="w-full border-primary/30 bg-card text-sm sm:text-base"
                  />
                </div>
              </div>
              <Button
                type="submit"
                className={`w-full font-bold rounded-lg py-2 shadow-lg transition-all duration-200 ease-in-out hover:bg-primary/80 ${systemTheme(
                  "bg-green-500 hover:bg-green-800 text-white"
                )}`}
                disabled={isLoading}
              >
                {isLoading ? "⌛ Cargando..." : `🛠️ Editar usuario`}
              </Button>
            </form>
          </CardContent>
        </div>
      </CardContent>
    </div>
  );
};

export default Profile;

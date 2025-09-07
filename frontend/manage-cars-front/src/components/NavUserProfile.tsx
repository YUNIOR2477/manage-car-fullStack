"use client";

import { ChevronsUpDown, CircleUser, LogOut } from "lucide-react";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "./ui/sidebar";
import { useAuthStore } from "@/store/authStore";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "@/store/userStore";
import type { User } from "@/types/Users";
import { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { useTheme } from "./Theme-provider";

export function NavUserProfile() {
  const { isMobile } = useSidebar();
  const { logout } = useAuthStore();
  const navigate = useNavigate();
  const { fetchMyProfile, isLoading, loadingError } = useUserStore();

  const [user, setUser] = useState<User | null>(null);
  const email = user?.email ?? "Correo no disponible";
  const name = user?.name ?? "Usuario";
  const initials = user?.name.slice(0, 2).toUpperCase();

  useEffect(() => {
    const fetchProfile = async () => {
      const myProfile = await fetchMyProfile();
      if (myProfile) {
        setUser(myProfile);
      } else {
        navigate("/login");
      }
    };
    fetchProfile();
  }, [fetchMyProfile, navigate]);

  const { theme } = useTheme();
  const isSystemTheme = theme === "system";

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        {isLoading ? (
          <p className="text-center text-gray-500">Cargando perfil...</p>
        ) : loadingError ? (
          <p className="text-center text-red-500">Error al cargar el perfil</p>
        ) : (
          <DropdownMenu>
            <DropdownMenuTrigger
              asChild
              className={` border border-primary mt-2 ${
                isSystemTheme ? "border-green-500" : ""
              }`}
            >
              <SidebarMenuButton
                size="lg"
                className={`data-[state=open]:bg-primary/10 cursor-pointer  hover:bg-primary/10  ${
                  isSystemTheme
                    ? "hover:bg-gray-800/50 data-[state=open]:bg-gray-800/50"
                    : ""
                }`}
              >
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarFallback
                    className={`rounded-lg text-primary-foreground bg-primary font-bold  ${
                      isSystemTheme ? "bg-green-500" : ""
                    }`}
                  >
                    {initials}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">{name}</span>
                  <span className="truncate text-xs">{email}</span>
                </div>
                <ChevronsUpDown className="ml-auto size-4" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className={`min-w-[160px] border-1 rounded-lg ml-3 bg-background ${
                theme !== "system"
                  ? "border-primary"
                  : "bg-gray-950 border-green-500"
              }`}
              side={isMobile ? "bottom" : "right"}
              align="end"
              sideOffset={4}
            >
              <DropdownMenuLabel className="p-0 font-normal ">
                <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarFallback
                      className={`rounded-lg text-primary-foreground font-bold bg-primary ${
                        isSystemTheme ? "bg-green-500" : "*:"
                      }`}
                    >
                      {initials}
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">{name}</span>
                    <span className="truncate text-xs">{email}</span>
                  </div>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator
                className={` ${
                  theme !== "system" ? "bg-primary" : "bg-green-500"
                }`}
              />
              <DropdownMenuGroup>
                <DropdownMenuItem
                  onClick={() =>
                    navigate(`/user/my-profile`, { replace: true })
                  }
                  className={`cursor-pointer focus:bg-primary/20 ${
                    isSystemTheme ? "focus:bg-gray-800/80" : ""
                  }`}
                >
                  <CircleUser
                    className={`${
                      theme !== "system" ? "text-primary/90" : "text-green-500"
                    }`}
                  />
                  Ver Perfil
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator
                className={` ${
                  theme !== "system" ? "bg-primary" : "bg-green-500"
                }`}
              />
              <div className="flex justify-center gap-6"></div>

              <DropdownMenuItem
                onClick={() => {
                  logout();
                  navigate("/auth/login");
                  window.location.reload();
                }}
                className={`cursor-pointer text-red-500 justify-center`}
              >
                <LogOut className="text-red-500" />
                Cerrar Sesion
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </SidebarMenuItem>
    </SidebarMenu>
  );
}

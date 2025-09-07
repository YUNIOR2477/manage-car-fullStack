import * as React from "react";
import { Eye, FilePlus2, Car } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "./ui/sidebar";
import { useTheme } from "./Theme-provider";
import { NavUserProfile } from "./NavUserProfile";
import { SidebarMenuNav } from "./SidebarMenuNav";

const data = {
  navCars: [
    {
      title: "Creacion",
      icon: FilePlus2,
      items: [
        {
          title: "Guardar vehiculo",
          url: "/user/cars/save",
        },
      ],
    },
    {
      title: "Visualizacion",
      icon: Eye,
      items: [
        {
          title: "Buscar vehiculos",
          url: "/user/cars/search",
        },
        {
          title: "Ver tus vehiculos",
          url: "/user/cars/my-cars",
        },
      ],
    },
  ],
};
export function UserSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const { theme } = useTheme();
  const isSystemTheme = theme === "system";

  return (
    <Sidebar
      variant="inset"
      {...props}
      className={`bg-background ${isSystemTheme ? "bg-gray-950" : ""}`}
    >
      <SidebarHeader
        className={`bg-background  ${isSystemTheme ? "bg-gray-950" : ""}`}
      >
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="/user">
                <div
                  className={`flex aspect-square size-8 items-center justify-center rounded-lg text-sidebar-primary-foreground ${
                    theme !== "system" ? " bg-sidebar-primary" : "bg-green-500"
                  }`}
                >
                  <Car className="size-7" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate text-lg font-semibold">
                    AutoData
                  </span>
                  <span className="truncate text-md">Usuario</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent
        className={`bg-background overflow-y-auto ${
          isSystemTheme ? "bg-gray-950" : ""
        }`}
      >
        <SidebarMenuNav title="Vehiculos" items={data.navCars} />
      </SidebarContent>
      <SidebarFooter
        className={` bg-background ${isSystemTheme ? "bg-gray-950" : ""}`}
      >
        <NavUserProfile />
      </SidebarFooter>
    </Sidebar>
  );
}

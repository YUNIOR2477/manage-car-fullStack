import { ModeToggle } from "@/components/ModeToggle";
import { useTheme } from "@/components/Theme-provider";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

interface LayoutProps {
  SidebarComponent: React.ReactNode; //
}

export default function PrincipalLayout({ SidebarComponent }: LayoutProps) {
  const [navigationTitle, setNavigationTitle] = useState<string | null>("");
  const [navigationBar, setNavigationBar] = useState<string | null>("");
  const navigate = useNavigate();

  const { theme } = useTheme();
  const isSystemTheme = theme === "system";

  useEffect(() => {
    setNavigationTitle(localStorage.getItem("navigationTitle"));
    setNavigationBar(localStorage.getItem("navigationBar"));
  }, [navigate]);

  return (
    <SidebarProvider>
      {SidebarComponent}
      <div className={`min-h-screen w-full flex flex-col`}>
        <SidebarInset className={`${isSystemTheme ? "bg-gray-950" : ""}`}>
          <header className="flex h-16 shrink-0 items-center gap-2 relative ">
            <div className="flex items-center gap-2 px-4 justify-between">
              <SidebarTrigger className="-ml-1" />
              <Separator orientation="vertical" className="mr-2 h-4" />
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem className=" md:block">
                    <BreadcrumbLink
                      onClick={() => {
                        localStorage.setItem("navigationBar", "");
                      }}
                      href="/"
                      className={`font-black text-primary text-base  ${
                        isSystemTheme
                          ? "text-green-500 hover:text-green-500/70"
                          : ""
                      }`}
                    >
                      Inicio
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator className=" mt-1 md:block " />
                  <BreadcrumbItem>
                    <BreadcrumbPage className="font-medium">
                      {navigationTitle}
                    </BreadcrumbPage>
                    <BreadcrumbSeparator
                      className={`mt-1 ${
                        navigationTitle !== "" ? " md:block" : "md:hidden"
                      }`}
                    />
                  </BreadcrumbItem>
                  <BreadcrumbItem>
                    <BreadcrumbPage className="font-normal">
                      {navigationBar}
                    </BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
            <div className="absolute right-4">
              <ModeToggle />
            </div>
          </header>
          <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
            <div
              className={`min-h-[100vh] flex-1 rounded-xl md:min-h-min bg-primary/10
                ${
                  isSystemTheme
                    ? "bg-gradient-to-br from-gray-800 via-gray-700 to-gray-800"
                    : ""
                }`}
            >
              <Outlet />
            </div>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}

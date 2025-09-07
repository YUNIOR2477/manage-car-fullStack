"use client";
import { Outlet } from "react-router-dom";
import { ModeToggle } from "@/components/ModeToggle";
import { useTheme } from "@/components/Theme-provider";

export default function AuthLayout() {
  const { theme } = useTheme();

  const isSystemTheme = theme === "system";

  return (
    <div
      className={`flex h-[100%] min-h-screen flex-col items-center justify-center p-6 sm:p-10 md:p-10 relative ${
        isSystemTheme
          ? "bg-gradient-to-br from-gray-800 via-gray-700 to-gray-800"
          : ""
      }`}
    >
      <div className={`absolute right-4 sm:right-8 top-4 sm:top-8 rounded-lg `}>
        <ModeToggle />
      </div>

      <div className="w-full max-w-xs sm:max-w-sm md:max-w-2xl lg:max-w-4xl p-6 sm:p-8">
        <Outlet />
        <div className={`text-center text-sm text-primary mt-6`}>
          Al continuar, aceptas nuestros{" "}
          <a
            href="/terms-of-service"
            className={`font-bold hover:underline ${
              isSystemTheme ? "text-green-500" : ""
            }`}
          >
            Términos de servicio
          </a>{" "}
          y{" "}
          <a
            href="/Privacy-Policy"
            className={`font-bold hover:underline ${
              isSystemTheme ? "text-green-500" : ""
            }`}
          >
            Política de privacidad
          </a>
          .
        </div>
      </div>
    </div>
  );
}

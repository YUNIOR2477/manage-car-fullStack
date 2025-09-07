import { useEffect, useState } from "react";
import { useNavigate, Outlet, useLocation } from "react-router-dom";

const ProtectedRoutes = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [role, setRole] = useState<string | null>(
    localStorage.getItem("userRole")
  );
  const [isAuthenticated, setIsAuthenticated] = useState<string | null>(
    localStorage.getItem("isAuthenticated")
  );

  useEffect(() => {
    const handleStorageChange = () => {
      setRole(localStorage.getItem("userRole"));
      setIsAuthenticated(localStorage.getItem("isAuthenticated"));
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  useEffect(() => {
    if (isAuthenticated === "false" || !isAuthenticated) {
      navigate("/auth/login", { replace: true });
      return;
    }

    const allowedRoutes: Record<string, string[]> = {
      ROLE_ADMIN: ["/admin"],
      ROLE_USER: ["/user"],
    };

    if (
      role &&
      !allowedRoutes[role]?.some((route) => location.pathname.startsWith(route))
    ) {
      navigate("/", { replace: true });
    }
  }, [role, isAuthenticated, navigate, location]);

  return <Outlet />;
};

export default ProtectedRoutes;

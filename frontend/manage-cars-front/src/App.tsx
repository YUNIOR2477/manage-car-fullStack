import { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import AuthRoutes from "./routing/AuthRoutes";
import ProtectedRoutes from "./routing/ProtectedRoutes";
import UserRoutes from "./routing/UserRoutes";
import { useAuthStore } from "./store/authStore";

const App: React.FC = () => {
  const syncToken = useAuthStore((state) => state.syncToken);
  const [role, setRole] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    syncToken();

    const storedRole = localStorage.getItem("userRole");

    setRole(storedRole);
    setIsLoading(false);
  }, [syncToken]);

  const getRedirectPath = () => {
    if (role === "ROLE_USER") return "/user";
    return "/auth/login";
  };

  if (isLoading) return null;

  return (
    <Router>
      <Routes>
        <Route path="/auth/*" element={<AuthRoutes />} />

        <Route element={<ProtectedRoutes />}>
          <Route path="/user/*" element={<UserRoutes />} />
        </Route>

        <Route path="/*" element={<Navigate to={getRedirectPath()} replace />} />
      </Routes>
    </Router>
  );
};

export default App;
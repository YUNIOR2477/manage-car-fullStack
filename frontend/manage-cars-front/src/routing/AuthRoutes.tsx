import AuthLayout from "@/layouts/AuthLayout";
import LoginPage from "@/pages/auth/LoginPage";
import RegisterPage from "@/pages/auth/RegisterPage";
import { Routes, Route } from "react-router-dom";


const AuthRoutes = () => {

    return (
        <Routes>
            <Route path="/" element={<AuthLayout />}>
                <Route index element={<LoginPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
            </Route>
        </Routes>
    );
};

export default AuthRoutes;
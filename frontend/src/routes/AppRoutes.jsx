import { Routes, Route, Navigate } from "react-router";
import Products from "../pages/Products";
import Analytics from "../pages/Analytics";
import MainLayout from "../pages/MainLayout";
import AuthLayout from "../pages/AuthLayout";
import Login from "../pages/Login";
import Register from "../pages/Register";
import User from "../pages/User";
import RequireAuth from "./RequireAuth";

const AppRoutes = () => (
    <Routes>
        <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
        </Route>

        <Route element={<RequireAuth />}>
            <Route element={<MainLayout />}>
                <Route path="/products" element={<Products />} />
                <Route path="/analytics" element={<Analytics />} />
                <Route path="/user" element={<User />} />
            </Route>
        </Route>

        <Route path="/" element={<Navigate to="/products" replace />} />
    </Routes>
);

export default AppRoutes;

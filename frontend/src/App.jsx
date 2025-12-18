import "./App.css";
import { Route } from "react-router";
import { Routes } from "react-router";
import Products from "./pages/Products";
import Analytics from "./pages/Analytics";
import MainLayout from "./pages/MainLayout";
import AuthLayout from "./pages/AuthLayout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { Navigate, Outlet } from "react-router";
import "@fontsource/poppins/300.css";
import "@fontsource/poppins/400.css";
import "@fontsource/poppins/500.css";
import "@fontsource/poppins/700.css";

const App = () => {
    const RequireAuth = () => {
        // const token = localStorage.getItem("token")
        const token = true; // TEMPORARILY
        return token ? <Outlet /> : <Navigate to="/login" replace />;
    };

    return (
        <div className="App">
            <Routes>
                <Route element={<AuthLayout />}>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                </Route>

                <Route element={<RequireAuth />}>
                    <Route element={<MainLayout />}>
                        <Route path="/products" element={<Products />} />
                        <Route path="/analytics" element={<Analytics />} />
                    </Route>
                </Route>

                <Route path="/" element={<Navigate to="/products" replace />} />
            </Routes>
        </div>
    );
};

export default App;

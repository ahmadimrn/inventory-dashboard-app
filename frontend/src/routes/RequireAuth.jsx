import { Navigate, Outlet } from "react-router";
import { useAuth } from "../context/AuthContext";
import { CircularProgress, Box } from "@mui/material";

const RequireAuth = () => {
    const { isAuthenticated, loading } = useAuth();

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" mt={8}>
                <CircularProgress />
            </Box>
        );
    }

    return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default RequireAuth;

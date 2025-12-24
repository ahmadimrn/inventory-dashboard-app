import { Outlet } from "react-router";
import { Toolbar, Box, CssBaseline } from "@mui/material";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const MainLayout = () => {
    return (
        <>
            <CssBaseline />
            <Navbar />

            <Toolbar />
            <Box sx={{ display: "flex" }}>
                <Sidebar />
                <Outlet />
            </Box>
        </>
    );
};

export default MainLayout;

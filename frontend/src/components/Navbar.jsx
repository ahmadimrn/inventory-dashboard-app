import {
    AppBar,
    IconButton,
    Toolbar,
    Typography,
    Box,
    Divider,
} from "@mui/material";
import { Menu as MenuIcon, Logout as LogoutIcon } from "@mui/icons-material";
import { useNavigate, Link } from "react-router";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await logout();
        } catch (error) {
            console.log("Logout failed");
        }
    };

    const toggleSidebar = () => {
        console.log("Clicked toggle sidebar");
    };

    return (
        <>
            <AppBar
                position="fixed"
                sx={{ zIndex: 1201, bgcolor: "background.navbar" }}
            >
                <Toolbar sx={{ justifyContent: "space-between" }}>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                        <IconButton
                            component={Link}
                            onClick={toggleSidebar}
                            sx={{ mr: 3 }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" fontWeight={600}>
                            Inventory Dashboard
                        </Typography>
                    </Box>

                    <IconButton aria-label="" onClick={handleLogout}>
                        <LogoutIcon />
                    </IconButton>
                </Toolbar>
                <Divider />
            </AppBar>
        </>
    );
};

export default Navbar;

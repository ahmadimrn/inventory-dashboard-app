import { Container, Typography, Button, Stack } from "@mui/material";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router";

const UserPage = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await logout();
            navigate("/login");
        } catch (err) {
            console.error("Logout failed:", err);
        }
    };

    if (!user) return null;

    return (
        <Container sx={{ mt: 5, width: "80%" }}>
            <Stack spacing={3} alignItems="flex-start">
                <Typography variant="h6" fontWeight={600}>
                    {user.name ? `Logged in as ${user.name}` : "Logged in"}
                </Typography>

                <Button variant="outlined" color="error" onClick={handleLogout}>
                    Logout
                </Button>
            </Stack>
        </Container>
    );
};

export default UserPage;

import { useState } from "react";
import {
    TextField,
    Button,
    Stack,
    Typography,
    Alert,
    Link,
} from "@mui/material";
import { Link as RouterLink } from "react-router";

const Login = () => {
    const [form, setForm] = useState({ email: "", password: "" });
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setError("");

        // API call will go here
        console.log("Login payload:", form);
    };

    return (
        <>
            <Typography variant="h5" fontWeight={600} mb={1}>
                Sign in
            </Typography>

            <Typography variant="body2" color="text.secondary" mb={3}>
                Access your inventory dashboard
            </Typography>

            <form onSubmit={handleSubmit}>
                <Stack spacing={2}>
                    {error && <Alert severity="error">{error}</Alert>}

                    <TextField
                        label="Email"
                        name="email"
                        type="email"
                        required
                        fullWidth
                        onChange={handleChange}
                    />

                    <TextField
                        label="Password"
                        name="password"
                        type="password"
                        required
                        fullWidth
                        onChange={handleChange}
                    />

                    <br />

                    <Button type="submit" variant="contained" size="large">
                        Login
                    </Button>

                    <Link
                        component={RouterLink}
                        to="/register"
                        underline="hover"
                        textAlign="center"
                    >
                        Don't have an account? Register
                    </Link>
                </Stack>
            </form>
        </>
    );
};

export default Login;

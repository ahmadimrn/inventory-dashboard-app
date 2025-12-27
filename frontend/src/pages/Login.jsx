import { useState } from "react";
import {
    TextField,
    Button,
    Stack,
    Typography,
    Alert,
    Link,
} from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router";
import api from "../services/api/axios";

const Login = () => {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (loading) return;

        setError("");
        setLoading(true);

        try {
            const res = await api.post("/auth/login", form, {
                withCredentials: true,
            });

            const { accessToken } = res.data;

            navigate("/products");
        } catch (err) {
            const data = err.response?.data;
            setError(err.response?.data?.message || "Login failed");
        } finally {
            setLoading(false);
        }
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
                        value={form.email}
                        onChange={handleChange}
                        required
                        fullWidth
                    />

                    <TextField
                        label="Password"
                        name="password"
                        type="password"
                        value={form.password}
                        onChange={handleChange}
                        required
                        fullWidth
                    />

                    <Button
                        type="submit"
                        variant="contained"
                        size="large"
                        disabled={loading}
                    >
                        {loading ? "Signing in..." : "Login"}
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

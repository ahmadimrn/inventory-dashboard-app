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

const Register = () => {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: "",
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
            await api.post("/auth/register", form);

            navigate("/login");
        } catch (err) {
            setError(err.response?.data?.message || "Registration failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Typography variant="h5" fontWeight={600} mb={1}>
                Create account
            </Typography>

            <Typography variant="body2" color="text.secondary" mb={3}>
                Start managing your inventory
            </Typography>

            <form onSubmit={handleSubmit}>
                <Stack spacing={2}>
                    {error && <Alert severity="error">{error}</Alert>}

                    <TextField
                        label="Full name"
                        name="name"
                        value={form.name}
                        required
                        fullWidth
                        onChange={handleChange}
                    />

                    <TextField
                        label="Email"
                        name="email"
                        type="email"
                        value={form.email}
                        required
                        fullWidth
                        onChange={handleChange}
                    />

                    <TextField
                        label="Password"
                        name="password"
                        type="password"
                        value={form.password}
                        required
                        fullWidth
                        helperText="Minimum 8 characters"
                        onChange={handleChange}
                    />

                    <Button
                        type="submit"
                        variant="contained"
                        size="large"
                        disabled={loading}
                    >
                        {loading ? "Creating account..." : "Register"}
                    </Button>

                    <Link
                        component={RouterLink}
                        to="/login"
                        underline="hover"
                        textAlign="center"
                    >
                        Already have an account? Login
                    </Link>
                </Stack>
            </form>
        </>
    );
};

export default Register;

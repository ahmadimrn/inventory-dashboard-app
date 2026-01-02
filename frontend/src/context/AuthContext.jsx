import { createContext, useContext, useEffect, useState, useMemo } from "react";
import api from "../services/api/axios";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const bootstrapAuth = async () => {
            try {
                const res = await api.post(
                    "/auth/refresh",
                    {},
                    { withCredentials: true }
                );

                setUser({
                    id: res.data.id,
                    name: res.data.name,
                });
            } catch {
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        bootstrapAuth();
    }, []);

    const login = async (credentials) => {
        try {
            const res = await api.post("/auth/login", credentials, {
                withCredentials: true,
            });

            setUser({
                id: res.data.id,
                name: res.data.name,
            });

            return {
                id: res.data.id,
                name: res.data.name,
            };
        } catch (err) {
            throw err;
        }
    };

    const register = async (payload) => {
        try {
            const res = await api.post("/auth/register", payload, {
                withCredentials: true,
            });

            setUser({
                id: res.data.id,
                name: res.data.name,
            });

            return {
                id: res.data.id,
                name: res.data.name,
            };
        } catch (err) {
            throw err;
        }
    };

    const logout = async () => {
        try {
            await api.post("/auth/logout", {}, { withCredentials: true });
        } finally {
            setUser(null);
        }
    };

    const value = useMemo(
        () => ({
            user,
            isAuthenticated: !!user,
            loading,
            login,
            register,
            logout,
        }),
        [user, loading]
    );

    if (loading) return null;

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);

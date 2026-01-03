import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:5000/api",
    withCredentials: true,
});

api.interceptors.response.use(
    (response) => {
        if (response.data?.accessToken) {
            api.defaults.headers.common[
                "Authorization"
            ] = `Bearer ${response.data.accessToken}`;
        }
        return response;
    },
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            const res = await api.post(
                "/auth/refresh",
                {},
                {
                    withCredentials: true,
                }
            );

            api.defaults.headers.common[
                "Authorization"
            ] = `Bearer ${res.data.accessToken}`;

            return api(originalRequest);
        }

        return Promise.reject(error);
    }
);

export default api;

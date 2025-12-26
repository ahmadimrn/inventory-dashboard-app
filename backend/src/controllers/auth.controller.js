import * as service from "../services/auth.service.js";

const refreshCookieOptions = {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    path: "/auth/refresh",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
};

export const register = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;

        const result = await service.register({ name, email, password });

        res.cookie("refreshToken", result.refreshToken, refreshCookieOptions);

        return res.status(200).json({
            id: result.id,
            name: result.name,
            accessToken: result.accessToken,
        });
    } catch (error) {
        next(error);
    }
};

export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const result = await service.login({ email, password });

        res.cookie("refreshToken", result.refreshToken, refreshCookieOptions);

        res.status(200).json({
            id: result.id,
            name: result.name,
            accessToken: result.accessToken,
        });

        return res.status(200).json(result);
    } catch (error) {
        next(error);
    }
};

export const refresh = async (req, res, next) => {
    try {
        const refreshToken = req.cookies.refreshToken;

        const result = await service.refresh(refreshToken);

        res.cookie("refreshToken", result.refreshToken, refreshCookieOptions);

        res.status(200).json({
            accessToken: result.accessToken,
        });
    } catch (error) {
        next(error);
    }
};

export const logout = async (req, res, next) => {
    try {
        const userId = req.user.id; // from access-token auth middleware

        await service.logout(userId);

        res.clearCookie("refreshToken", {
            path: "/auth/refresh",
        });

        res.status(200);
    } catch (error) {
        next(error);
    }
};

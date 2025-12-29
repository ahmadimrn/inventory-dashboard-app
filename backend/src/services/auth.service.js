import bcrypt from "bcrypt";
import { prisma } from "../config/db.config.js";
import jwt from "jsonwebtoken";
import {
    generateAccessToken,
    generateRefreshToken,
} from "../middleware/auth.middleware.js";

export const register = async ({ name, email, password }) => {
    const existing = await prisma.user.findUnique({
        where: { email: email },
    });

    if (existing) {
        throw new Error("User with email already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
        data: {
            name,
            email: email,
            password: hashedPassword,
        },
    });

    const accessToken = await generateAccessToken(user.id, user.name);
    const refreshToken = await generateRefreshToken(user.id, user.name);
    const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);

    await prisma.user.update({
        where: { id: user.id },
        data: { refreshToken: hashedRefreshToken },
    });

    return {
        message: "User registered successfully",
        id: user.id,
        name: user.name,
        accessToken,
        refreshToken,
    };
};

export const login = async ({ email, password }) => {
    const user = await prisma.user.findUnique({
        where: { email },
    });

    if (!user) {
        throw new Error("Invalid credentials");
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
        throw new Error("Invalid credentials");
    }

    const accessToken = await generateAccessToken(user.id, user.name);
    const refreshToken = await generateRefreshToken(user.id, user.name);
    const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);

    await prisma.user.update({
        where: { email },
        data: { refreshToken: hashedRefreshToken },
    });

    return {
        message: "User logged in successfully.",
        id: user.id,
        name: user.name,
        accessToken,
        refreshToken,
    };
};

export const refresh = async (refreshToken) => {
    if (!refreshToken) {
        throw new Error("Refresh token not found");
    }

    console.log("Refresh token received:", refreshToken);

    let payload;
    try {
        // Verify the raw refresh token
        payload = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    } catch (err) {
        throw new Error("Invalid refresh token");
    }

    const user = await prisma.user.findUnique({
        where: { id: payload.id },
    });

    if (!user || !user.refreshToken) {
        throw new Error("Forbidden");
    }

    // Compare the raw token with hashed token stored in DB
    const isValid = await bcrypt.compare(refreshToken, user.refreshToken);
    if (!isValid) {
        throw new Error("Token reuse detected");
    }

    // Generate new tokens
    const newAccessToken = await generateAccessToken(user.id, user.name);
    const newRefreshToken = await generateRefreshToken(user.id, user.name);
    const hashedRefreshToken = await bcrypt.hash(newRefreshToken, 10);

    // Persist new refresh token
    await prisma.user.update({
        where: { id: user.id },
        data: { refreshToken: hashedRefreshToken },
    });

    return {
        id: user.id,
        name: user.name,
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
    };
};

export const logout = async (userId) => {
    await prisma.user.update({
        where: { id: userId },
        data: { refreshToken: null },
    });

    return;
};

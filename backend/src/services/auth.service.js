import bcrypt from "bcrypt";
import { prisma } from "../config/db.config.js";
import { generateToken } from "../middleware/auth.middleware.js";

export const register = async ({ name, email, password }) => {
    const existing = await prisma.user.findUnique({
        where: { email },
    });

    if (existing) {
        throw new Error("User with email already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
        data: {
            name,
            email: email.toLowerCase(),
            password: hashedPassword,
        },
    });

    const token = await generateToken(user.id, user.name);

    return {
        id: user.id,
        name: user.name,
        token,
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

    const token = await generateToken(user.id, user.name);

    return {
        id: user.id,
        name: user.name,
        token,
    };
};

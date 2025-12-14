import { prisma } from "../config/db.config.js";
import bcrypt from "bcrypt";
import { generateToken } from "../middleware/auth.middleware.js";

export const register = async (data) => {
    const { name, email, password } = data;

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
        data: {
            name,
            email,
            password: hashedPassword,
        },
    });

    const token = await generateToken(newUser.id, name);

    return { newUser, token };
};

export const findUser = async (email) => {
    const existingUser = await prisma.user.findUnique({
        where: {
            email: email,
        },
    });

    console.log(existingUser);

    return existingUser;
};

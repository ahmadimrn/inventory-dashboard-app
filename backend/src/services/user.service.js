import { prisma } from "../config/db.config.js";

export const createUser = async (data) => {
    const { name, email, password } = data;

    const newUser = await prisma.user.create({
        data: {
            name,
            email,
            password,
        },
    });

    return newUser;
};

export const findUser = async (email) => {
    const existingUser = await prisma.user.findUnique({
        where: {
            email: email,
        },
    });

    return existingUser;
};

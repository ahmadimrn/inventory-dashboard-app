import { prisma } from "../config/db.config.js";

export const getAll = async (userId) => {
    const products = await prisma.product.findMany({
        where: { userId },
    });

    return products;
};

export const create = async (reqBody, userId) => {
    const { name, price, stock, category } = reqBody;

    const newProduct = await prisma.product.create({
        data: {
            userId,
            name,
            price,
            stock,
            category,
        },
    });

    return newProduct;
};

export const update = async (productId, userId, data) => {
    const { name, price, stock, category } = data;

    const updatedProduct = prisma.product.update({
        where: {
            id: productId,
            userId: userId,
        },
        data: {
            name,
            price,
            stock,
            description,
            category,
        },
    });

    return updatedProduct;
};

export const deleteProduct = async (productId, userId) => {
    const product = await prisma.product.findFirst({
        where: {
            id: productId,
            userId: userId,
        },
    });

    if (!product) {
        throw new Error("Product not found or unauthorized");
    }

    await prisma.product.delete({
        where: { id: productId },
    });

    return;
};

import * as service from "../services/product.service.js";

export const getAll = async (req, res, next) => {
    try {
        const products = await service.getAll(req.user.id);

        return res
            .status(200)
            .json({ message: "Retrieved all products", data: products });
    } catch (error) {
        next(error);
    }
};

export const create = async (req, res, next) => {
    try {
        const newProduct = await service.create(req.body, req.user.id);

        return res.status(200).json({
            message: "Product created successfully",
            data: newProduct,
        });
    } catch (error) {
        next(error);
    }
};

export const update = async (req, res, next) => {
    try {
        const productId = req.params.id;
        const userId = req.user.id;
        const data = req.body;

        const updatedProduct = await service.update(productId, userId, data);

        return res.status(200).json({
            message: "Product updated successfully",
            data: updatedProduct,
        });
    } catch (error) {
        next(error);
    }
};

export const deleteProduct = async (req, res, next) => {
    try {
        const id = parseInt(req.params.id);
        const userId = req.user.id;

        await service.deleteProduct(id, userId);

        return res.status(200).json({ message: "Deleted item succesfully" });
    } catch (error) {
        next(error);
    }
};

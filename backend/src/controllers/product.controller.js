import * as service from "../services/product.service.js";

export const getAll = async (req, res) => {
    const getAll = await service.getAll(req.user.id);

    return res
        .status(200)
        .json({ message: "Getting all products", data: getAll });
};

export const create = async (req, res) => {
    const newProduct = await service.create(req);

    return res
        .status(200)
        .json({ message: "Product created", data: newProduct });
};

export const update = async (req, res) =>
    res.json(await service.update(req.params.id, req.body));

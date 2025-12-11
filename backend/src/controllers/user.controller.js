import * as service from "../services/user.service.js";

export const createUser = (req, res) => {
    const newUser = service.createUser(req.body);
    res.status(201).json(newUser);
};

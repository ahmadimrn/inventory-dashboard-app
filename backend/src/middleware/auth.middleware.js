import jwt from "jsonwebtoken";
import "dotenv/config";
import { check, validationResult } from "express-validator";

export const authMiddleware = async (req, res, next) => {
    const token = req.header("x-auth-token");

    if (!token) {
        return res.status(400).json({ message: "Token not found" });
    }

    try {
        const userPayload = await jwt.verify(
            token,
            process.env.ACCESS_TOKEN_SECRET
        );

        req.user = {
            id: userPayload.id,
            name: userPayload.name,
        };

        next();
    } catch (error) {
        return res.status(400).json({ message: "Token invalid" });
    }
};

export const generateAccessToken = async (id, name) => {
    const payload = {
        id,
        name,
    };

    const token = await jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "15m",
    });

    return token;
};

export const generateRefreshToken = async (id, name) => {
    const payload = {
        id,
        name,
    };

    const token = await jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: "15d",
    });

    return token;
};

export const registerValidator = [
    // Validation rules

    check("email").isEmail().withMessage("Invalid email"),

    check("password")
        .isStrongPassword({
            minLength: 8,
            minUppercase: 0,
            minLowercase: 0,
            minNumbers: 1,
            minSymbols: 1,
        })
        .withMessage(
            "Password must contain atleast 8 characters with atleast 1 number and 1 symbol."
        ),

    // Validate input

    (req, res, next) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
            });
        }

        next();
    },
];

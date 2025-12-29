import express from "express";
import cors from "cors";
import "dotenv/config";
import indexRoutes from "./routes/index.routes.js";
import errorHandler from "./middleware/errorHandler.middleware.js";
import cookieParser from "cookie-parser";

const app = express();

// global middlewares

app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true,
    })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// routing

app.use("/api", indexRoutes);

// error handler

app.use(errorHandler);

export default app;

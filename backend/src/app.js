import express from "express";
import cors from "cors";
import "dotenv/config";
import indexRoutes from "./routes/index.routes.js";

const app = express();

// middlewares

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routing

app.use("/api", indexRoutes);

export default app;

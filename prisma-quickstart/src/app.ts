import express from "express";
import { getEnv } from "./utils/helpers";
import userRouter from "./routes/user";
import postRouter from "./routes/post";

const port = getEnv().PORT || 5000;
const app = express();

// Middleware
app.use(express.json());

// Routes
app.use("/api/user", userRouter);
app.use("/api/post", postRouter);

export {
    app,
    port
}
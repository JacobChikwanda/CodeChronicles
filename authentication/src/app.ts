import express from "express";
import cookieParser from 'cookie-parser';

import { getEnv } from "./utils/helper";
import userRouter from "./routes/user";
import postRouter from "./routes/posts";
import { verifyToken } from "./middleware";
import accountRouter from "./routes/account";

const app = express();
const { PORT: port } = getEnv();

app.use(express.json());
app.use(cookieParser());

app.use("/api/user", userRouter);
app.use("/api/post", verifyToken ,postRouter);
app.use("/account", accountRouter);
app.get("/", (req, res) => res.send("<h1>Welcome 😊 The site is under construction.</h1>"))

export {
    app,
    port
}
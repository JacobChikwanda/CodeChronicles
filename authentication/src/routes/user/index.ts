import express, { Router } from "express";
import { deleteUser, getUser, login, signUp, updateUser } from "../../controllers/user";
import { verifyToken } from "../../middleware";
const userRouter: Router = express.Router();

userRouter.post('/', signUp);
userRouter.get('/', verifyToken, getUser);
userRouter.put('/', verifyToken, updateUser);
userRouter.delete('/', verifyToken, deleteUser);
userRouter.post('/login', login);

export default userRouter;
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_1 = require("../../controllers/user");
const middleware_1 = require("../../middleware");
const userRouter = express_1.default.Router();
userRouter.post('/', user_1.signUp);
userRouter.get('/', middleware_1.verifyToken, user_1.getUser);
userRouter.put('/', middleware_1.verifyToken, user_1.updateUser);
userRouter.delete('/', middleware_1.verifyToken, user_1.deleteUser);
userRouter.post('/login', user_1.login);
exports.default = userRouter;

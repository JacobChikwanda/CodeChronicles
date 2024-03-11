"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = __importDefault(require("../../lib/db"));
const userRouter = express_1.default.Router();
userRouter.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        yield db_1.default.user.create({
            data: {
                email: data.email,
                name: data.name,
                posts: {
                    create: {
                        title: data.title,
                        content: data.content
                    }
                }
            }
        });
        res.status(200).json({ success: true, message: "User created successfully." });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "User could not be created." });
    }
}));
userRouter.get("/:email", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.params;
        const data = yield db_1.default.user.findMany({
            where: {
                email
            },
            include: {
                posts: true,
            }
        });
        res.json({ success: true, data });
    }
    catch (error) {
        console.error(error);
        res.json({ success: false, error });
    }
}));
exports.default = userRouter;

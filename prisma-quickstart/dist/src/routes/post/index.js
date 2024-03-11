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
const postRouter = express_1.default.Router();
postRouter.post('/:email', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.params;
        const postData = req.body;
        // Get the user
        const existingUser = yield db_1.default.user.findUnique({ where: { email } });
        if (!existingUser) {
            return res.status(404).json({ success: false, message: "User does not exist" });
        }
        yield db_1.default.post.create({
            data: {
                title: postData.title,
                content: postData.content,
                author: {
                    connect: { id: existingUser.id }
                }
            }
        });
        return res.status(200).json({ success: false, message: "Post created" });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Post not created", error });
    }
}));
exports.default = postRouter;

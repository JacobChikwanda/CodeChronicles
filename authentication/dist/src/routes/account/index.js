"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const middleware_1 = require("../../middleware");
const account_1 = require("../../controllers/account");
const accountRouter = express_1.default.Router();
accountRouter.get("/:token", middleware_1.decodeToken, account_1.verifyAccount);
exports.default = accountRouter;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.port = exports.app = void 0;
const express_1 = __importDefault(require("express"));
const helpers_1 = require("./utils/helpers");
const user_1 = __importDefault(require("./routes/user"));
const post_1 = __importDefault(require("./routes/post"));
const port = (0, helpers_1.getEnv)().PORT || 5000;
exports.port = port;
const app = (0, express_1.default)();
exports.app = app;
// Middleware
app.use(express_1.default.json());
// Routes
app.use("/api/user", user_1.default);
app.use("/api/post", post_1.default);

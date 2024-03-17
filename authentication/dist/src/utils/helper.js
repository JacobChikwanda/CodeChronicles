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
exports.isAppOnline = exports.generateToken = exports.getEnv = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require('dotenv').config('../../.env');
const getEnv = () => process.env;
exports.getEnv = getEnv;
// Create Token
const { JWT_SECRET, SERVER_HOST } = (0, exports.getEnv)();
const generateToken = (payload, expiresIn) => {
    const token = jsonwebtoken_1.default.sign(payload, JWT_SECRET, { expiresIn: expiresIn || '10m' });
    return token;
};
exports.generateToken = generateToken;
// Check whether app is online online
const isAppOnline = () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield fetch(SERVER_HOST);
    if (response.ok) {
        return { status: true, url: SERVER_HOST };
    }
    return { status: false };
});
exports.isAppOnline = isAppOnline;

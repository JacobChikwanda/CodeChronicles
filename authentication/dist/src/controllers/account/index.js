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
exports.verifyAccount = void 0;
const db_1 = __importDefault(require("../../lib/db"));
const verifyAccount = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield db_1.default.user.findUnique({
            where: {
                id: request.user.id
            }
        });
        if (!user) {
            return response.status(401).send(`<h4 style='color:red'>Invalid account.</h4>`);
        }
        yield db_1.default.user.update({
            where: {
                id: user.id
            },
            data: {
                confirmed: true
            }
        });
        return response.status(200).send(`<div><h1>🥳 Congratulations</h1><p>Your account has been verified</p></div>`);
    }
    catch (error) {
        response.status(500).send("<h1>Something went wrong</h1>");
    }
});
exports.verifyAccount = verifyAccount;

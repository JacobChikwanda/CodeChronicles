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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPosts = void 0;
const post_1 = require("../../lib/data/post");
const getPosts = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return response.json({ data: (0, post_1.getPostsData)(), user: request.user });
    }
    catch (error) {
        return response.status(500).json({ success: false, message: "Something went wrong" });
    }
});
exports.getPosts = getPosts;

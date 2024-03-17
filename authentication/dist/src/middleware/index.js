"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.decodeToken = exports.verifyToken = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const helper_1 = require("../utils/helper");
const verifyToken = (request, response, next) => {
    try {
        const token = request.cookies['token'];
        const { JWT_SECRET } = (0, helper_1.getEnv)();
        if (token) {
            const userData = (0, jsonwebtoken_1.verify)(token, JWT_SECRET);
            request.user = userData;
            next();
        }
        else {
            response.status(401).json({ success: false, message: "Session expired or token not found" });
        }
    }
    catch (error) {
        if (error instanceof jsonwebtoken_1.JsonWebTokenError) {
            return response.status(500).json({ success: false, message: "Invalid token" });
        }
        response.status(500).json({ success: false, message: "Something went wrong" });
    }
};
exports.verifyToken = verifyToken;
const decodeToken = (request, response, next) => {
    try {
        const { token } = request.params;
        const { JWT_SECRET } = (0, helper_1.getEnv)();
        if (token) {
            const userData = (0, jsonwebtoken_1.verify)(token, JWT_SECRET);
            request.user = userData;
            next();
        }
        else {
            return response.status(401).send(`<p style='color:red;'>Session expired or token not found</p>`);
        }
    }
    catch (error) {
        if (error instanceof jsonwebtoken_1.JsonWebTokenError) {
            return response.status(500).send(`<p style='color:red;'>Invalid token or token expired.</p>`);
        }
        return response.status(500).send(`<p style='color:red;'>Something went wrong</p>`);
    }
};
exports.decodeToken = decodeToken;

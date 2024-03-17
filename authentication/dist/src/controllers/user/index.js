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
exports.login = exports.deleteUser = exports.updateUser = exports.getUser = exports.signUp = void 0;
const bcryptjs_1 = require("bcryptjs");
const db_1 = __importDefault(require("../../lib/db"));
const user_1 = require("../../lib/data/user");
const helper_1 = require("../../utils/helper");
const mail_1 = require("../../utils/mail");
const signUp = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = request.body;
        // Validate
        if (!data.email && !data.name && !data.password) {
            return response.status(404).json({ success: false, message: "Invalid sign up details" });
        }
        // Check existing record
        const existingUser = yield db_1.default.user.findUnique({
            where: {
                email: data.email
            }
        });
        if (existingUser) {
            return response.status(403).json({ success: false, message: "User with given email already exists" });
        }
        data.password = yield (0, bcryptjs_1.hash)(data.password, 10);
        // Create user
        const user = yield db_1.default.user.create({
            data: data
        });
        const payload = {
            id: user.id,
            name: user.name
        };
        // Check if account is verified
        if (!user.confirmed) {
            const { data } = yield (0, mail_1.sendConfirmationEmail)(user, payload);
            if (data) {
                return response.status(202).json({ success: false, message: "User created successfully. Email sent. Verify your account." });
            }
            return response.status(401).json({ success: false, message: "Something went wrong. Could not sign you up. Try again." });
        }
    }
    catch (error) {
        console.error(error);
        return response.status(500).json({ success: false, message: "Something went wrong." });
    }
});
exports.signUp = signUp;
const getUser = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = request.user;
        const user = yield (0, user_1.getUserData)(id);
        if (!user) {
            return response.status(404).json({ success: false, message: "No user found." });
        }
        return response.status(200).json({ success: true, user });
    }
    catch (error) {
        return response.status(500).json({ success: false, message: "Something went wrong." });
    }
});
exports.getUser = getUser;
const updateUser = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { newPassword } = request.body;
        const { id } = request.user;
        const existingUser = yield (0, user_1.getUserData)(id);
        if (!existingUser) {
            return response.status(404).json({ success: false, message: "User does not exist" });
        }
        const hashedPassword = yield (0, bcryptjs_1.hash)(newPassword, 10);
        yield db_1.default.user.update({
            data: {
                password: hashedPassword
            },
            where: {
                id
            }
        });
        return response.status(200).json({ success: true, message: "User updated" });
    }
    catch (error) {
        return response.status(500).json({ success: false, message: "Something went wrong.", error });
    }
});
exports.updateUser = updateUser;
const deleteUser = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = request.user;
        const user = yield (0, user_1.getUserData)(id);
        if (!user) {
            return response.status(404).json({ success: false, message: "User does not exist." });
        }
        yield db_1.default.user.delete({
            where: {
                id: user.id
            }
        });
        return response.status(200).json({ success: true, message: "User deleted." });
    }
    catch (error) {
        return response.status(500).json({ success: false, message: "Something went wrong." });
    }
});
exports.deleteUser = deleteUser;
const login = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = request.body;
        const user = yield (0, user_1.getUserDataByEmail)(email);
        if (!user) {
            return response.status(404).json({ success: false, message: "User doesn't exist" });
        }
        // Compare password
        if (!(yield (0, bcryptjs_1.compare)(password, user.password))) {
            return response.status(403).json({ success: false, message: "Incorrect password" });
        }
        const payload = {
            id: user.id,
            name: user.name
        };
        // Check if account is verified
        if (!user.confirmed) {
            const { data } = yield (0, mail_1.sendConfirmationEmail)(user, payload);
            if (data) {
                return response.status(202).json({ success: false, message: "Account not verified. Email sent." });
            }
            return response.status(401).json({ success: false, message: "Something went wrong. Account not verified. Try again." });
        }
        const token = (0, helper_1.generateToken)(payload);
        return response
            .status(200)
            .cookie("token", token, {
            httpOnly: true,
            maxAge: 10 * 60 * 1000
        })
            .json({ success: true, message: "Login successful." });
    }
    catch (error) {
        return response.status(500).json({ success: false, message: "Something went wrong" });
    }
});
exports.login = login;

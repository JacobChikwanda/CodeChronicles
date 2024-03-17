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
exports.sendConfirmationEmail = exports.sendEmail = void 0;
const resend_1 = require("resend");
const helper_1 = require("./helper");
const sendEmail = (emailData) => __awaiter(void 0, void 0, void 0, function* () {
    const { RESEND_API_KEY } = (0, helper_1.getEnv)();
    const resend = new resend_1.Resend(RESEND_API_KEY);
    const { data, error } = yield resend.emails.send({
        from: 'onboarding@resend.dev',
        to: emailData.to,
        subject: emailData.subject,
        html: emailData.html
    });
    return {
        data,
        error
    };
});
exports.sendEmail = sendEmail;
// Confirmation Email
const sendConfirmationEmail = (user, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const token = (0, helper_1.generateToken)(payload, "5m");
    const response = yield (0, helper_1.isAppOnline)();
    const html = (`<div>
            <h1>Welcome ${user.name}</h1>
            <hr />
            <p>Click <a href='${response.status ? response.url : 'http://localhost:5000'}/account/${token}'>here</a> to confirm your account. Link will expire in 5 minutes.</p>
        </div>`);
    return yield (0, exports.sendEmail)({ subject: "Confirm Email", to: user.email, html });
});
exports.sendConfirmationEmail = sendConfirmationEmail;

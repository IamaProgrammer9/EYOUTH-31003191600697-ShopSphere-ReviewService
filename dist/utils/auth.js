"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserFromRequest = getUserFromRequest;
const axios_1 = __importDefault(require("axios"));
async function getUserFromRequest(req) {
    const token = req.cookies?.accessToken;
    const cookieHeader = req.headers.cookie;
    // Pass the Cookie header along to Server B
    const response = await axios_1.default.get(`${process.env.BACKEND_URL || 'https://nile-bridge-backend.vercel.app'}/api/auth/`, {
        headers: {
            Cookie: cookieHeader || '',
        },
    });
    console.log(response.data);
    return response.data;
}

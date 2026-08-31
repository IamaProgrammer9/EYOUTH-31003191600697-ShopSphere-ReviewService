import { Request } from "express";
import axios from "axios";

export async function getUserFromRequest(req: Request, bodyAccessToken?: string) {
    const token = req.cookies?.accessToken || bodyAccessToken;

    const cookieHeader = req.headers.cookie;

    const headers: Record<string, string> = {
        Cookie: cookieHeader || '',
    };

    if (token) {
        headers.Authorization = `Bearer ${token}`;
    }

    const response = await axios.get(`${process.env.BACKEND_URL || 'https://nile-bridge-backend.vercel.app'}/api/auth/`, {
        headers,
    });

    return response.data;
}
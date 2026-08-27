import { Request } from "express";
import axios from "axios";

export async function getUserFromRequest(req: Request) {
    const token = req.cookies?.accessToken;

    console.log(req.cookies)

    const cookieHeader = req.headers.cookie;

    // Pass the Cookie header along to Server B
    const response = await axios.get(`${process.env.BACKEND_URL || 'https://nile-bridge-backend.vercel.app'}/api/auth/`, {
        headers: {
            Cookie: cookieHeader || '',
        },
        withCredentials: true
    });

    console.log(response.data)

    return response.data;
}
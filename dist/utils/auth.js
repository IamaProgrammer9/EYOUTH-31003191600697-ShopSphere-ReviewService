import axios from "axios";
export async function getUserFromRequest(req) {
    const token = req.cookies?.accessToken;
    const cookieHeader = req.headers.cookie;
    // Pass the Cookie header along to Server B
    const response = await axios.get(`${process.env.BACKEND_URL || 'http://localhost:3000'}/api/auth/`, {
        headers: {
            Cookie: cookieHeader || '',
        },
    });
    console.log(response.data);
    return response.data;
}

import axios from "axios";
import https from "node:https";
const axiosInstance = axios.create({
    httpsAgent: new https.Agent({rejectUnauthorized: false}) // Ignores SSL errors
});
// Export GET handler for this route
export async function GET(req) {
    const { searchParams } = req.nextUrl;  // Use `nextUrl` to access query parameters
    const transactionId = searchParams.get("transactionId");

    if (!transactionId) {
        return new Response(
            JSON.stringify({ success: false, message: "Missing transactionId" }),
            { status: 400 }
        );
    }

    const apikey = process.env.MTN_API_KEY;
    const clientId = process.env.MTN_CLIENT_ID;
    const clientSecret = process.env.MTN_CLIENT_SECRET;
    const apiKey = process.env.MTN_API_KEY;
    const baseUrl = process.env.MTN_BASE_URL;
    const environment = process.env.MTN_CLIENT_ENV;

    console.log("Starting authorization...")
    const authResponse = await axiosInstance.post(`${baseUrl}/collection/token/`, {}, {
        headers: {
            'Ocp-Apim-Subscription-Key': apiKey,
            'Authorization': `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}`
        },
    });
    await console.log("Auth Res: " + authResponse.data.access_token)
    const accessToken = authResponse.data.access_token;
    console.log("Access Token: " + accessToken);

    try {
        const response = await axiosInstance.get(`${baseUrl}/collection/v1_0/requesttopay/${transactionId}`, {
            headers: {
                'Ocp-Apim-Subscription-Key': apikey,
                'X-Target-Environment': 'sandbox',
                'Authorization': `Bearer ${accessToken}`,
            },
        });

        const status = response.data.status;
        console.log("Status: "+status)
        return new Response(
            JSON.stringify({ status }),
            { status: 200 }
        );
    } catch (error) {
        console.error("Error:", error);
        return new Response(
            JSON.stringify({
                success: false,
                error: error.response?.data || error.message,
            }),
            { status: 500 }
        );
    }
}

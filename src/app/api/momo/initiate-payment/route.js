import axios from "axios";
import * as https from "node:https";

export async function POST(request) {
    try {
        const {phoneNumber, amount, transactionId} = await request.json();
        const clientId = process.env.MTN_CLIENT_ID;
        const clientSecret = process.env.MTN_CLIENT_SECRET;
        const apiKey = process.env.MTN_API_KEY;
        const baseUrl = process.env.MTN_BASE_URL;
        const environment = process.env.MTN_CLIENT_ENV;
        console.log(clientId, clientSecret, baseUrl, environment, apiKey);

        const axiosInstance = axios.create({
            httpsAgent: new https.Agent({rejectUnauthorized: false}) // Ignores SSL errors
        });
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
        const paymentResponse = await axiosInstance.post(
            `${baseUrl}/collection/v1_0/requesttopay`,
            {
                amount: amount.toString(),
                currency: 'EUR',
                externalId: transactionId.toString(),
                payer: {
                    partyIdType: 'MSISDN',
                    partyId: phoneNumber.toString()
                },
                payerMessage: "Omwesolabs Subscriptions",
                payeeNote: "Thanks for your payment"
            },
            {
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'X-Reference-Id': transactionId,
                    'X-Target-Environment': environment,
                    'Ocp-Apim-Subscription-Key': apiKey,
                    'Content-Type': 'application/json'
                }
            }
        )
        return Response.json({success: true, data: paymentResponse.data}, {status: 200});
    } catch (error) {
        console.error("Error: " + error)
        return Response.json({success: false, error: error.response?.data || error.message,}, {status: 500});
    }
}
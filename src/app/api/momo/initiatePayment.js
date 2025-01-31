import axios from "axios";

export default async function (req, res) {
    if (req.method === 'POST') {
        const {phoneNumber, amount, transactionId} = req.body;
        const clientId = process.env.MTN_CLIENT_ID
        const clientSecret = process.env.MTN_CLIENT_SECRET
        const apiKey = process.env.MTN_API_KEY
        const baseUrl = `https://sandbox.momodeveloper.mtn.com`
        try {
            const authResponse = await axios.post(
                `${baseUrl}/collection/token`, {}, {
                    headers: {
                        'Authorization': `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}`
                    }
                }
            )
            const accessToken = authResponse.data.access_token
            const paymentResponse = await axios.post(
                `${baseUrl}/collection/v1_0/requesttopay`,{
                    amount,
                    currency: 'UGX',
                    externalId: transactionId,
                    payer:{
                        partyIdType: 'MSISDN',
                        partyId: phoneNumber
                    },
                    payerMessage: 'OmwesoLabs Subscriptions',
                    payeeNote: 'Thanks for your payment',
                },{
                    headers: {
                        'Authorization':`Bearer ${accessToken}`,
                        'X-Reference-Id':transactionId,
                        'X-Target-Environment':'sandbox',
                        'Ocp-Apim-Subscription-Key':apiKey,
                        'Content-Type': 'application/json'
                    }
                }
            )
            res.status(200).json({success:true,data:paymentResponse.data})
        } catch (error) {
            console.error(error)
            res.status(500).json({success:false,error:error.response?.data || error.message})
        }
    }else {
        res.setHeader('Allow',['POST'])
        res.status(405).end(`Method ${req.method} Not Allowed`)
    }
}
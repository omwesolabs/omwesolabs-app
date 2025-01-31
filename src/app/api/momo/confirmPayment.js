import axios from "axios";

export default async function handler(req, res) {
    if (req.method === 'GET') {
        const {transactionId} = req.query;
        const apikey = process.env.MTN_API_KEY
        const baseUrl = process.env.MTN_BASE_URL
        try {
            const response = await axios.get(`${baseUrl}/collection/v1_0/requesttopay/${transactionId}`, {
                headers: {
                    'Ocp-Apim-Subscription-Key': apikey,
                    'X-Target-Environment': 'sandbox'
                }
            })
            const status = response.data.status;
            res.status(200).json({status})
        } catch (error) {
            console.error(error)
            res.status(500).json({success:false,error:error.response?.data || error.message})
        }
    } else {
        res.setHeader('Allow',['GET'])
        res.status(405).end(`Method ${req.method} Not Allowed`)
    }
}
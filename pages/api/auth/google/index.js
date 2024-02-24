import nextConnect from "next-connect";
import { oauth2Client } from "../../../../server/services/google";

const api = nextConnect({
    onError(error, req, res) {
        res.status(501).json({ error: `Sorry something Happened! ${error.message}` });
    },
    onNoMatch(req, res) {
        res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
    },
})

api.get( async (req, res) => {
    const url = oauth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: [
            'profile',
            'email',
        ]
    })

    res.redirect(url)
})

export default api
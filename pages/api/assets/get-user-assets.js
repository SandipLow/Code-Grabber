import nextConnect from 'next-connect';
import connectToMongo from '../../../server/db';
import Asset from '../../../server/models/Asset';
import fetchUser from '../../../server/middleware/fetchUser';


const apiRoute = nextConnect({
    onError(error, req, res) {
        console.log(error);
        res.status(501).json({ error: `Sorry something Happened! ${error.message}` });
    },
    onNoMatch(req, res) {
        res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
    },
});

apiRoute.use(fetchUser);

apiRoute.get(async (req, res) => {
    await connectToMongo();

    const assets = await Asset.find({ user: req.user.id }).sort({ createdAt: -1 });

    res.json({ assets });
});

export default apiRoute;
import nextConnect from 'next-connect';
import connectToMongo from '../../../server/services/mongodb';
import fetchUser from '../../../server/middleware/fetchUser';
import Asset from '../../../server/models/Asset';

const apiRoute = nextConnect({
    onError(error, req, res) {
        console.log(error);
        res.status(501).json({ error: `Sorry something Happened! ${error.message}` });
    },
    onNoMatch(req, res) {
        res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
    },
});


apiRoute.use(async (req, res, next) => {
    await connectToMongo();
    next();
})


// send user's assets
apiRoute.get(fetchUser, async (req, res) => {
    const assets = await Asset.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json({ assets });
})


// upload asset
apiRoute.post(fetchUser,  async (req, res) => {
    res.send("to be implemented");
})


export default apiRoute;
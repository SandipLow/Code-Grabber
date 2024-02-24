import nextConnect from "next-connect";
import connectToMongo from "../../../server/services/mongodb";
import fetchUser from "../../../server/middleware/fetchUser";
import Asset from "../../../server/models/Asset";
import cloudinary from "../../../server/services/cloudinary";

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


// send user's asset as a reverse proxy
apiRoute.get(fetchUser, async (req, res) => {
    const asset = await cloudinary.api.resource(req.query.filename);
    asset.body.pipe(res);
})

// delete asset
apiRoute.delete(fetchUser, async (req, res) => {
    const asset = await Asset.findOne({ user: req.user.id, filename: req.query.filename });
    if (!asset) {
        return res.status(404).send("asset not found");
    }

    await cloudinary.uploader.destroy(asset.filename);
    await asset.remove();

    res.send("asset deleted");
})

export default apiRoute;
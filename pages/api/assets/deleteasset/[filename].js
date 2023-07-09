import nextConnect from "next-connect";
import { assetBucket } from "../../../../server/buckets";
import Asset from "../../../../server/models/Asset";

const apiRoute = nextConnect({
    onError(error, req, res) {
        res.status(501).json({ error: `Sorry something Happened! ${error.message}` });
    },
    onNoMatch(req, res) {
        res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
    },
});

apiRoute.delete( async (req, res)=> {
    const { gfsAsset } = await assetBucket()
    await gfsAsset.files.deleteOne({ filename: req.query.filename });
    await Asset.deleteOne({ filename: req.query.filename });
    res.send("success");
})

export default apiRoute;
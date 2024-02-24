import nextConnect from "next-connect";
import { assetBucket } from "../../../../server/buckets";
import connectToMongo from "../../../../server/services/mongodb";

const apiRoute = nextConnect({
    onError(error, req, res) {
        console.log(error);
        res.status(501).json({ error: `Sorry something Happened! ${error.message}` });
    },
    onNoMatch(req, res) {
        res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
    },
});

apiRoute.get( async (req, res)=> {
    await connectToMongo()
    
    const { gridfsAssetBucket, gfsAsset } = await assetBucket()

    const file = await gfsAsset.files.findOne({ filename: req.query.filename });

    if(!file) {
        res.status(404).send("not found");
        return;
    }

    const readStream = gridfsAssetBucket.openDownloadStream(file._id);
    readStream.pipe(res);
})

export default apiRoute;
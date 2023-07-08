import nextConnect from "next-connect";
import { profilePicBucket } from "../../../../server/buckets";

const apiRoute = nextConnect({
    onError(error, req, res) {
        res.status(501).json({ error: `Sorry something Happened! ${error.message}` });
    },
    onNoMatch(req, res) {
        res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
    },
});

apiRoute.get( async (req, res)=> {
    const { gridfsProfilePicBucket, gfsProfilePic } = await profilePicBucket()

    const file = await gfsProfilePic.files.findOne({ filename: req.query.filename });

    if(!file) {
        res.status(404).send("not found");
        return;
    }

    const readStream = gridfsProfilePicBucket.openDownloadStream(file._id);
    readStream.pipe(res);
})

export default apiRoute;
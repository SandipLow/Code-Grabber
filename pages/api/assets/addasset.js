import nextConnect from "next-connect";
import connectToMongo from "../../../server/db";
import fetchUser from "../../../server/middleware/fetchUser"
import { uploadAsset } from "../../../server/middleware/upload";

const apiRoute = nextConnect({
    onError(error, req, res) {
        console.log(error);
        res.status(501).json({ error: `Sorry something Happened! ${error.message}` });
    },
    onNoMatch(req, res) {
        res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
    },
});

apiRoute.use(fetchUser)
        .use(uploadAsset.single("file"))

apiRoute.post( async (req, res)=> {
    await connectToMongo()

    if (req.file === undefined) return res.send("you must select a file.");
    const imgUrl = `https://codegrabber.vercel.app/api/assets/getasset/${req.file.filename}`;
    res.send(imgUrl);
})

export default apiRoute;

// api config :
export const config = {
    api: {
      bodyParser: false, // Disallow body parsing, consume as stream
    },
  };
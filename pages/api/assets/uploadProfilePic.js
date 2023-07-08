import nextConnect from "next-connect";
import { uploadProfilePictures } from "../../../server/middleware/upload";

const apiRoute = nextConnect({
    onError(error, req, res) {
        console.log(error);
        res.status(501).json({ error: `Sorry something Happened! ${error.message}` });
    },
    onNoMatch(req, res) {
        res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
    },
});

apiRoute.use(uploadProfilePictures.single('file'))

apiRoute.post(async (req, res) => {
    if (req.file === undefined) return res.send("you must select a file.");
    const imgUrl = `/api/assets/getprofilepic/${req.file.filename}`;
    res.send(imgUrl);
})

export default apiRoute;

export const config = {
    api: {
        bodyParser: false
    }
}
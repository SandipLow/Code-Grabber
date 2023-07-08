import nextConnect from "next-connect";
import connectToMongo from "../../../server/db";
import Blog from "../../../server/models/Blog";

const apiRoute = nextConnect({
    onError(error, req, res) {
        console.log(error);
        res.status(501).json({ error: `Sorry something Happened! ${error.message}` });
    },
    onNoMatch(req, res) {
        res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
    },
});

apiRoute.post( async (req, res)=> {
    await connectToMongo()
    // get the slug from req body
    const { slug } = req.body
    // Check if the slug is available or not
    const check = await Blog.findOne({slug})

    if(check) res.send(false)
    else res.send(true)
})

export default apiRoute;
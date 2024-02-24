import nextConnect from "next-connect";
import connectToMongo from "../../../server/services/mongodb";
import Blog from "../../../server/models/Blog";
import { blogMapper } from "../../../server/functions/blog";

const apiRoute = nextConnect({
    onError(error, req, res) {
        res.status(501).json({ error: `Sorry something Happened! ${error.message}` });
    },
    onNoMatch(req, res) {
        res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
    },
});

apiRoute.get( async (req, res)=> {
    await connectToMongo()

    const _blogs = await Blog.find({}).sort({likes : -1}).limit(6);
    const blogs = await blogMapper(_blogs);

    res.json(blogs);
})

export default apiRoute;
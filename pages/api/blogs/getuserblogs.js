import nextConnect from "next-connect";
import connectToMongo from "../../../server/db";
import fetchUser from "../../../server/middleware/fetchUser";
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

apiRoute.use(fetchUser)

apiRoute.get( async (req, res)=> {
    await connectToMongo()
    const blogs = await Blog.find({ user: req.user.id })
    return res.send(blogs)
})

export default apiRoute;
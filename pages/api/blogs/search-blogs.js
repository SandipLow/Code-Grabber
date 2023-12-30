import nextConnect from "next-connect";
import Blog from "../../../server/models/Blog";
import connectToMongo from "../../../server/db";

const apiRoute = nextConnect({
    onError(error, req, res) {
        console.log(error)
        res.status(501).json({ error: `Sorry something Happened! ${error.message}` });
    },
    onNoMatch(req, res) {
        res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
    },
});


apiRoute.get( async (req, res)=> {
    await connectToMongo()

    const { query: { q } } = req;
    const blogs = await Blog.find({$text: {$search: q}});

    res.json(blogs);
})

export default apiRoute;
import nextConnect from "next-connect";
import connectToMongo from "../../../../server/db"
import Blog from "../../../../server/models/Blog"

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

    const blog = await Blog.findOne({ slug: req.query.slg })
    if(!blog) {
        res.status(404).send("No Such blog found...!!!")
    }
    else {
        res.json(blog);
    }
})

export default apiRoute;
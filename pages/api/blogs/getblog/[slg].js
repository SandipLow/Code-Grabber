import nextConnect from "next-connect";
import connectToMongo from "../../../../server/services/mongodb"
import Blog from "../../../../server/models/Blog"
import { blogMapper } from "../../../../server/functions/blog";

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

    const ___blog = await Blog.findOne({ slug: req.query.slg })
    
    if(!___blog) {
        res.status(404).send("No Such blog found...!!!")
        return
    }
    
    const __blog = [___blog]
    const _blog = await blogMapper(__blog);
    const blog = _blog[0]
    
    res.json(blog);
})

export default apiRoute;
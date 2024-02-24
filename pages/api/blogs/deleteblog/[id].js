import nextConnect from "next-connect";
import connectToMongo from "../../../../server/services/mongodb";
import Blog from "../../../../server/models/Blog";
import fetchUser from "../../../../server/middleware/fetchUser";

const apiRoute = nextConnect({
    onError(error, req, res) {
        res.status(501).json({ error: `Sorry something Happened! ${error.message}` });
    },
    onNoMatch(req, res) {
        res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
    },
});

apiRoute.use(fetchUser)

apiRoute.delete( async (req, res)=> {
    await connectToMongo()

    try {
        const blog = await Blog.findById(req.query.id);

        if (!blog) {
            res.send("No blog Found...!")
            return
        }

        if (blog.user==req.user.id) {

            await Blog.findByIdAndDelete(req.query.id);
            res.send("blog has been deleted")
            
        } else res.send("Access Denied...!")

    } catch (e) {
        console.log(e);
        res.status(503).send("Sorry Some Server Issue")
    }
})

export default apiRoute;
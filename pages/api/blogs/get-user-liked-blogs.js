import nextConnect from "next-connect";
import fetchUser from "../../../server/middleware/fetchUser";
import connectToMongo from "../../../server/db";
import Blog from "../../../server/models/Blog";


const apiRoute = nextConnect({
    onError(error, req, res) {
        console.log(error);
        res.status(501).json({ error: `Sorry something Happened! ${error.message}` });
    },
    onNoMatch(req, res) {
        res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
    }
});

apiRoute.use(fetchUser)

apiRoute.get( async (req, res)=> {
    await connectToMongo()

    const user = req.user

    if(!user) {
        res.status(401).send("You are not authenticated")
        return
    }

    // Get blogs where likes array includes user id
    const blogs = await Blog.find({ likes: user.id })

    res.status(200).json(blogs)
})

export default apiRoute;
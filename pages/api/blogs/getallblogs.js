import nextConnect from "next-connect";
import User from "../../../server/models/User";
import Blog from "../../../server/models/Blog";
import connectToMongo from "../../../server/db";

// Get all the Blogs with query using GET: "/api/blogs/getallblogs" .
// queries {
// limit: no of docs required
// tags: tag of the query
// user: name of the creator
// }
// no Log in required...
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

    const query = {}
    
    // Limit
    const limit = req.query.limit ? req.query.limit : 0
    
    // Tags
    const tags = req.query.tags
    if (tags) {
        query.tags = { $all: tags.split(",") }
    }
    
    // Username
    const userName = req.query.user
    if (userName) {
        const users = await User.find({ displayName: userName })
        const userIds = users.map(user=>user.id)

        if (userIds.length!==0) {
            query.user = { $in: userIds }
        }
    }

    const blogs = await Blog.find(query).limit(limit);
    res.json(blogs);
})

export default apiRoute;
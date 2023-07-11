import nextConnect from "next-connect";
import fetchUser from "../../../../server/middleware/fetchUser";
import connectToMongo from "../../../../server/db";
import Blog from "../../../../server/models/Blog";

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

apiRoute.post( async (req, res)=> {
    await connectToMongo()
    
    const slg = req.query.slg
    const user = req.user

    if(!user) {
        res.status(401).send("You are not authenticated")
        return
    }

    const blog = await Blog.findOne({ slug: slg }).lean()

    if(!blog) {
        res.status(404).send("No Such blog found...!!!")
        return
    }

    if (typeof blog.likes === "number" || typeof blog.likes === "undefined") {
        blog.likes = [ user.id ]
        await Blog.findOneAndUpdate({ slug: slg }, { $set: { likes: blog.likes } })
        res.status(200).json({message: "liked"})
    }

    else {
        const isLiked = blog.likes.includes(user.id)
    
        if(isLiked) {
            blog.likes.splice(blog.likes.indexOf(user.id), 1)

            await Blog.findOneAndUpdate({ slug: slg }, { $set: { likes: blog.likes } })
            res.status(200).json({message: "unliked", likes: blog.likes.length})
        }
    
        if(!isLiked) {
            blog.likes.push(user.id)

            await Blog.findOneAndUpdate({ slug: slg }, { $set: { likes: blog.likes } })
            res.status(200).json({message: "liked", likes: blog.likes.length})
        }
    }


})


export default apiRoute;
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

    const blog = await Blog.findOne({ slug: slg })

    if(!blog) {
        res.status(404).send("No Such blog found...!!!")
        return
    }

    if (!blog.likes) {
        blog.likes = [
            user.id
        ]
        await blog.save()
        res.status(200).json({message: "liked"})
    }

    else {
        const isLiked = blog.likes.includes(user.id)
    
        if(isLiked) {
            await blog.likes.pull(user.id)
            await blog.save()
            res.status(200).json({message: "unliked"})
        }
    
        if(!isLiked) {
            await blog.likes.push(user.id)
            await blog.save()
            res.status(200).json({message: "liked"})
        }
    }


})


export default apiRoute;
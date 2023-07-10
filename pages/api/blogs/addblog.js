import { body, validationResult } from "express-validator";
import nextConnect from "next-connect";
import connectToMongo from "../../../server/db";
import fetchUser from "../../../server/middleware/fetchUser";
import validate from "../../../server/middleware/validate";
import Blog from "../../../server/models/Blog"

const apiRoute = nextConnect({
    onError(error, req, res) {
        res.status(501).json({ error: `Sorry something Happened! ${error.message}` });
    },
    onNoMatch(req, res) {
        res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
    },
});

apiRoute.use(fetchUser)

apiRoute.use(validate([
    // Validation array
    body("title", "Title length must be >= 3").isLength({ min: 3}),
    body("description", "description length must be >= 5").isLength({ min: 5})
]))

apiRoute.post( async (req, res)=> {
    try {
        await connectToMongo()

        // Errors in a single json...
        const errors = validationResult(req);

        // If there error return the error json...
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        // Create blog...
        const blog = await Blog.create({
            user: req.user.id,
            title : req.body.title,
            content : req.body.content,
            description : req.body.description,
            tags : req.body.tags,
            slug : req.body.slug,
            img : req.body.img,
        })

        res.send(blog);
    } catch (e) {
        console.log(e);
        res.status(503).send("Sorry Some Server Issue")
    }
})

export default apiRoute;
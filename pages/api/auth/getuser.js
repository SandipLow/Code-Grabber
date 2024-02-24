import nextConnect from "next-connect";
import User from "../../../server/models/User";
import fetchUser from "../../../server/middleware/fetchUser";
import connectToMongo from "../../../server/services/mongodb";

const apiRoute = nextConnect({
    onError(error, req, res) {
        res.status(501).json({ error: `Sorry something Happened! ${error.message}` });
    },
    onNoMatch(req, res) {
        res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
    },
})

apiRoute.use(fetchUser)

apiRoute.post( async (req, res)=> {
    await connectToMongo()
    
    const user = await User.findById( req.user.id ).select("-password")
    res.json(user)
})

export default apiRoute
import nextConnect from "next-connect";
import bcrypt from "bcryptjs"
import User from "../../../server/models/User";
import connectToMongo from "../../../server/db";
import jwt from "jsonwebtoken"
import validate from "../../../server/middleware/validate";
import { body, validationResult } from "express-validator";

// My web token signature...
const JWT_DATA = "sandip@low";

const apiRoute = nextConnect({
    onError(error, req, res) {
        res.status(501).json({ error: `Sorry something Happened! ${error.message}` });
    },
    onNoMatch(req, res) {
        res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
    },
});

apiRoute.use(validate(
    [
        // Validation array
        body("email", "Enter valid email").isEmail(),
        body("password", "password must not be less than 5").isLength({ min: 5 })
    ]
))

apiRoute.post( async (req, res)=> {
    // Errors in a single json...
    const errors = validationResult(req);

    // If there error return the error json...
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // Connect to Mongo...
    await connectToMongo()

    // Destructuring  of request body...
    let { profilePic, displayName, email, password } = req.body;

    // Check if there is any user with the email...
    let user = await User.findOne({ email });

    if (user) {
        return res.send("The Email is alredy in use...")
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    if (!displayName) {
        displayName = ["Mysterio Mountain", "Wonder Learner", "Franchise Fire", "Evil Devil", "Unknown Assassin", "Horrific Creed", "Night Sun"][Math.floor(Math.random() * 7)];
    }

    if (!profilePic) {
        profilePic = "https://images.saymedia-content.com/.image/t_share/MTc0NTE4MDEzODc2MjUwNTY5/strongest-avatars.png"
    }

    user = await User.create({
        profilePic,
        displayName,
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
    })

    const data = {
        user: {
            id: user.id
        }
    }

    const authtoken = jwt.sign(data, JWT_DATA)

    res.json({ name: user.displayName, authtoken })
})

export default apiRoute;
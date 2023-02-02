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
})

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

    // connect to mongo
    await connectToMongo();

    // Destructuring  of request body...
    const { email, password } = req.body;

    // Check the user with the email...
    let user = await User.findOne({ email });

    if (!user) {
        // The user doesn't exist...
        return res.status(400).json({ error: "Enter correct credentials..." });
    }

    // Check the password...
    const matchPassword = await bcrypt.compare(password, user.password);

    if (!matchPassword) {
        // Password mismatch...
        return res.status(400).json({ error: "Enter correct credentials..." });
    }

    const data = {
        user: {
            id: user.id
        }
    }

    const authtoken = jwt.sign(data, JWT_DATA);

    res.json({ name: user.displayName, authtoken });
} )

export default apiRoute
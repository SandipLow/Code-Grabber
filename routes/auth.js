const express = require("express");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const fetchUser = require("../middleware/fetchUser");
const passport = require("passport")

// My web token signature...
const JWT_DATA = "sandip@low";

const router = express.Router();

router.post('/login', [

    // Validation array
    body("email", "Enter valid email").isEmail(),
    body("password", "password must not be less than 5").isLength({ min: 5 })

],

    async (req, res) => {

        // Errors in a single json...
        const errors = validationResult(req);

        // If there error return the error json...
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

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
        // res.json(user);
        // res.send("Succsessful request...👍");
})

router.post('/signup', [
    // Validation array
    body("email", "Enter valid email").isEmail(),
    body("password", "password must not be less than 5").isLength({ min: 5 })

], async (req, res) => {
    // Errors in a single json...
    const errors = validationResult(req);

    // If there error return the error json...
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

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

router.post('/getuser', fetchUser, async (req, res) => {
    const user = await User.findById( req.user.id ).select("-password")
    res.json(user)
})

// Google OAuth SignIn (no login required)
router.get('/google', passport.authenticate('google', {
    scope: ['profile', 'email']
}))

// Google OAuth Redirect URI (no need to visit...🙂)
router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
    // res.json(req.user)
    const data = {
        user: {
            id: req.user.id
        }
    }
    
    const token = jwt.sign(data, JWT_DATA)
    res.redirect(process.env.CLIENT_URI + "/redirect?token=" + token + "&name=" + req.user.displayName)
})

module.exports = router;
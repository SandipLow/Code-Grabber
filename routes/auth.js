const express = require("express");
const {body, validationResult} = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fetchUser = require('../middleware/fetchUser');
const { db } = require("../models/Blog");

// My web token signature...
const JWT_DATA = "sandip@low";

const router = express.Router();

router.post('/login', [

    // Validation array
    body("email", "Enter valid email").isEmail(),
    body("password", "password must not be less than 5").isLength({ min: 5 })

] ,

async (req, res) => {
    
    // Errors in a single json...
    const errors = validationResult(req);

    // If there error return the error json...
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // Destructuring  of request body...
    const {email, password} = req.body;

    // Check the user with the email...
    let user = await db.collection("users").findOne({ email });

    if (!user) {
        // The user doesn't exist...
        return res.status(400).json({ error: "Enter correct credentials..."});
    }

    // Check the password...
    const matchPassword = await bcrypt.compare(password, user.password);

    if(!matchPassword) {
        // Password mismatch...
        return res.status(400).json({ error: "Enter correct credentials..."});
    }

    const data = {
        user : {
            id : user.id
        }
    }

    const authtoken = jwt.sign(data, JWT_DATA);

    res.json({ authtoken: authtoken });
    // res.json(user);
    // res.send("Succsessful request...👍");
})

module.exports = router;
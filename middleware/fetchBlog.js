const jwt = require("jsonwebtoken");

const JWT_DATA = "sandip@low";

const fetchBlog = (req, res, next) => {
    // Get the user from the token and ddd id to req object...
    const token = req.header("auth-token");

    if (!token) {
        res.status(401).send({ error : "please authenticate using valid token...!"})
    }

    try {

        const data = jwt.verify(token, JWT_DATA);
        req.user = data.user;
        next();

    } catch (error) {
        res.send({ error : `Internal server error`})
        console.log(error);
    }
}

module.exports = fetchBlog;
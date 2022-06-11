const jwt = require("jsonwebtoken");

const JWT_DATA = "sandip@low";

const fetchUser = (req, res, next) => {
    // Get the user from the token and ddd id to req object...
    const token = req.header("auth-token");

    if (!token) {
        res.status(401).send({ error : "please authenticate using valid token...!"})
        return;
    }

    try {

        const data = jwt.verify(token, JWT_DATA);
        req.user = data.user;
        next();

    } catch (error) {
        console.log(error);
        res.status(501).send({ error : `Internal server error`})
    }
}

module.exports = fetchUser;
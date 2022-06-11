const express = require('express');
const Blog = require("../models/Blog");
const router = express.Router();


// ROUTE 1: get all the Blogs of the user using GET: "/api/blogs/getallblogs" . no Log in required...
router.get('/getallblogs', async (req, res) => {

    const blogs = await Blog.find();
    res.json(blogs);
})

// ROUTE 2: get blog by id using GET: "/api/blogs/getblog" . no log in required...
router.get('/getblog/:slg', async (req, res) => {

    const blog = await Blog.findOne({ slug: req.params.slg })
    if(!blog) {
        res.status(404).send("No Such blog found...!!!")
    }
    else {
        res.json(blog);
    }
})

// ROUTE 3: get recent blogs by id using GET: "/api/blogs/recents" . no log in required...
router.get('/recents', async (req, res) => {

    const blogs = await Blog.find({}).sort({date_modified : -1}).limit(3);
    res.json(blogs);
})

// ROUTE 4: get popular blogs on the basis of likes by id using GET: "/api/blogs/popular" . no log in required...
router.get('/populars', async (req, res) => {

    const blogs = await Blog.find({}).sort({likes : -1}).limit(6);
    res.json(blogs);
})



module.exports = router;
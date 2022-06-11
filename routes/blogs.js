const express = require('express');
const fetchUser = require('../middleware/fetchUser');
const Blog = require("../models/Blog");
const {body, validationResult} = require("express-validator");
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

// ROUTE 5: add a blog using POST: "/api/auth/addnote". Log in required...
router.post('/addblog', fetchUser, [

    // Validation array
    body("title", "Title length must be >= 3").isLength({ min: 3}),
    body("description", "description length must be >= 5").isLength({ min: 5})

], async (req, res) => {
    
    // Errors in a single json...
    const errors = validationResult(req);

    // If there error return the error json...
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // Create blog...
    const blog = await Blog.create({
        title : req.body.title,
        content : req.body.content,
        description : req.body.description,
        likes : 0,
        tags : req.body.tags,
        slug : req.body.slug,
        img : req.body.img,
    })

    res.send(blog);
})


module.exports = router;
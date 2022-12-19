const express = require('express');
const fetchUser = require('../middleware/fetchUser');
const Blog = require("../models/Blog");
const User = require("../models/User");
const {body, validationResult} = require("express-validator");
const router = express.Router();


// Get all the Blogs with query using GET: "/api/blogs/getallblogs" .
// queries {
// limit: no of docs required
// tags: tag of the query
// user: name of the creator
// }
// no Log in required...
router.get('/getallblogs', async (req, res) => {

    const query = {}
    
    // Limit
    const limit = req.query.limit ? req.query.limit : 0
    
    // Tags
    const tags = req.query.tags
    if (tags) {
        query.tags = { $all: tags.split(",") }
    }
    
    // Username
    const userName = req.query.user
    if (userName) {
        const users = await User.find({ displayName: userName })
        const userIds = users.map(user=>user.id)

        if (userIds.length!==0) {
            query.user = { $in: userIds }
        }
    }

    const blogs = await Blog.find(query).limit(limit);
    res.json(blogs);
})

// Get all the Blogs of the particular user using GET: "/api/blogs/getuserblogs" . no Log in required...
router.get('/getuserblogs', fetchUser, async (req, res)=> {
    const blogs = await Blog.find({ user: req.user.id })
    return res.send(blogs)
})

// Get blog by id using GET: "/api/blogs/getblog" . no log in required...
router.get('/getblog/:slg', async (req, res) => {

    const blog = await Blog.findOne({ slug: req.params.slg })
    if(!blog) {
        res.status(404).send("No Such blog found...!!!")
    }
    else {
        res.json(blog);
    }
})

// Get recent blogs by id using GET: "/api/blogs/recents" . no log in required...
router.get('/recents', async (req, res) => {

    const blogs = await Blog.find({}).sort({date_modified : -1}).limit(3);
    res.json(blogs);
})

// Post popular blogs on the basis of likes by id using GET: "/api/blogs/popular" . no log in required...
router.get('/populars', async (req, res) => {

    const blogs = await Blog.find({}).sort({likes : -1}).limit(6);
    res.json(blogs);
})

// Post a blog using POST: "/api/blogs/addblog". Log in required...
router.post('/addblog', fetchUser, [

    // Validation array
    body("title", "Title length must be >= 3").isLength({ min: 3}),
    body("description", "description length must be >= 5").isLength({ min: 5})

], async (req, res) => {
    
    try {
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
            likes : 0,
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

// Edit a blog using PUT: "/api/blogs/editblog/:id". Log in required...
router.put('/editblog/:id', fetchUser, [

    // Validation Array
    body("title", "Title length must be >= 3").isLength({ min: 3}),
    body("description", "description length must be >= 5").isLength({ min: 5})

], async (req, res) => {

    try {
        // Errors in a single json...
        const errors = validationResult(req);

        // If there error return the error json...
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const update = {
            title : req.body.title,
            content : req.body.content,
            description : req.body.description,
            tags : req.body.tags,
            slug : req.body.slug,
            img : req.body.img,
            date_modified : Date.now()
        };

        const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, {$set : update}, {new : true});

        res.json(updatedBlog);

    } catch (e) {
        console.log(e);
        res.status(503).send("Sorry Some Server Issue")
    }
})

// Delete a blog using DELETE: "/api/blogs/deleteblog/:id". Log in required...
router.delete('/deleteblog/:id', fetchUser, async (req, res) => {

    const blog = await Blog.findById(req.params.id);

    if (blog.user==req.user.id) {

        await Blog.findByIdAndDelete(req.params.id);
        res.send("blog has been deleted")
        
    } else res.send("Access Denied...!")

})


module.exports = router;
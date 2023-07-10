import { Schema, models, model } from 'mongoose';

const BlogSchema = new Schema({
    user : {
        type: String,
        default: "*",
    },
    title : {
        type: String,
        required: true
    },
    content : {
        type: String,
        required: true
    },
    description : {
        type: String,
        required: true
    },
    likes : {
        type: Array,
        default: []
    },
    tags : {
        type: Array,
    },
    slug : {
        type: String, 
        required: true
    },
    img : {
        type : String,
        required: true
    },
    date_created : {
        type : Date,
        default : Date.now
    }, 
    date_modified : {
        type : Date,
        default : Date.now
    }
})

const Blog = models.blogposts || model('blogposts', BlogSchema);
export default Blog;
const mongoose = require('mongoose');
const {Schema} = mongoose;

const BlogSchema = new Schema({
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
        type: Number
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

module.exports = mongoose.model('blogposts', BlogSchema);
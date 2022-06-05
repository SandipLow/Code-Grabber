const mongoose = require('mongoose');
const mongoURI = process.env.MONGODB_URI;

// connceting to mogo db using the URI
const connectToMongo = ()=>{
    mongoose.connect(mongoURI, ()=>{
        console.log("Connected to Mongo Successfully");
    })
}
module.exports = connectToMongo;
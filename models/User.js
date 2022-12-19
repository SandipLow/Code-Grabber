const mongoose = require('mongoose');
const {Schema} = mongoose;

const UserSchema = new Schema({
    provider : {
        type : String,
        default : "Native"
    },
    providerId : {
        type : String,
        default : "N/A"
    },
    displayName : {
        type : String,
    },
    profilePic : {
        type : String,
    },
    email : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    }
})

module.exports = mongoose.model('users', UserSchema);
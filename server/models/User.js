import { Schema, models, model } from 'mongoose';

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

const User = models.users || model('users', UserSchema);
export default User;
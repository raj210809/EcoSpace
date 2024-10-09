import mongoose from "mongoose";

const userModel = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    batch : {
        type : String,
        required:true
    },
    role : {
        type : String,
        enum : ['Admin' , 'Student' , 'Alumni'],
        default:'Student'
    },
    profilePic : {
        type : String,
    },
    about : {
        type : String
    },
    currentlyIn : {
        type : String
    },
    position : {
        type : String
    },
    instagram : {
        type  :String
    },
    linkedin : {
        type : String
    }
})

const User = mongoose.model('User' , userModel)
export default User
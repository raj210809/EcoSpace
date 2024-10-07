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
    }
})

const User = mongoose.model('User' , userModel)
export default User
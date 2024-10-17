import mongoose from "mongoose";


const chatSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    from: {
        type: String,
        required: true
    },
    msg: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    }
})

const activeChat = mongoose.model('activeChat', chatSchema)
export default activeChat
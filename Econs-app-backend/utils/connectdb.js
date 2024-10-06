import mongoose from "mongoose";

export const mongoconnect = async ()=>{
    try {
        await mongoose.connect('mongodb://localhost:27017/yourdbname');
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB", error);
    }
}
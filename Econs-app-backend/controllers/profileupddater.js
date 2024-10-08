import express from 'express';
import User from '../models/user.model.js';
import mongoose from 'mongoose';
export const updateprofilepic = async (req,res)=>{
    const {_id , profilePic , about , currentlyIn , position} = req.body;
    try {
        const user = await User.findById(_id);
    if(!user){
        return res.status(404).json({message: 'User not found'});
    }
    user.profilePic = profilePic;
    user.about = about
    user.currentlyIn = currentlyIn
    user.position = position
    await user.save();
    res.status(200).json({ message: 'profile updated' })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Server error', error });
    }
}
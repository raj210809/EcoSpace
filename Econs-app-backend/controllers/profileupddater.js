import express from 'express';
import User from '../models/user.model.js';
import mongoose from 'mongoose';
export const updateprofilepic = async (req,res)=>{
    const {id , profilepic} = req.body;
    try {
        const user = await User.findById(id);
    if(!user){
        return res.status(404).json({message: 'User not found'});
    }
    user.profilePic = profilepic;
    await user.save();
    res.status(200).json({ message: 'profile pic changed' })
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
}
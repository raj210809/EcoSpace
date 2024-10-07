import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import User from '../models/user.model.js'; // Use ES module syntax
import jwt from 'jsonwebtoken';

// Signup controller
export const signup = async (req, res) => {
    const { password, email, name, batch } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({ name, password: hashedPassword, email, batch });
        await newUser.save();

        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Login controller
export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }
        const token = jwt.sign({id:user._id}, process.env.JWT_SECRET,{algorithm: 'HS256'});

        res.status(200).json({ message: 'Login successful',token:token });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

export const getuserdetails = async (req, res) => {
    const authHeader = req.headers.authorization;

    // Check if Authorization header is present
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'No token provided' });
    }

    // Extract the token from the Authorization header
    const token = authHeader.split(' ')[1];

    try {
        // Verify and decode the token (replace 'your_secret_key' with your actual secret)
        const decoded = jwt.verify(token, process.env.JWT_SECRET);  // Make sure you have `JWT_SECRET` in your environment variables

        // Use the decoded information to get the user ID (assuming the _id is in the token payload)
        const userId = decoded.id;

        // Fetch the user from the database
        const user = await User.findOne({ _id: userId });

        if (!user) {
            return res.status(400).json({ message: 'Invalid user id' });
        }

        // Respond with user details
        res.status(200).json({ user });
    } catch (error) {
        // Handle token verification or server errors
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ message: 'Invalid token' });
        }
        res.status(500).json({ message: 'Server error', error });
    }
};

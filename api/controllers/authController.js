import User from "../models/User.model.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";
const register = async (req, res) => {
    try {
        const { username,  password } = req.body;
        const userExists = await User.findOne({ username });
        if (userExists) {
            return res.status(400).json({ message: "User already exists" });
        }
        
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            username,
            password: hashedPassword
        });

        if (user) {
            res.status(201).json({
                _id: user.id,
                name: user.name,
                token: generateToken(user._id)
            });
        } else {
            res.status(400).json({ message: "Invalid user data" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error" });
    }
};

const login = async (req, res) => {
    
    try {
        const { username, password } = req.body;

        const user = await User.findOne({ username });
        // console.log(await User.matchPassword(password));
        
        if (user && await bcrypt.compare(password, user.password)) {
            const token = generateToken(user._id);
            
            res.cookie('token', token, {
                maxAge: 15 * 24 * 60 * 60 * 1000 // 15 days
            });
            res.status(200).json({
                _id: user._id,
                name: user.username,
                token
            });
        } else {
            res.status(400).json({ message: "Invalid credentials" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error" });
    }
};
const logout = async (req, res) => {
    res.clearCookie('token');
    res.status(200).json({ message: 'Logout successful' });
}

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET);
};

export { register, login ,logout};

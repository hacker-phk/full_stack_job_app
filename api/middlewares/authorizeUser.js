import jwt from 'jsonwebtoken';
import User from '../models/User.model.js';

const protectedRoute =async (req, res, next) => {
    
    try {
        const token = req.cookies.token;
        
        
        
        if(!token){

            return res.status(401).json({message:"unauthorized - no token provided"});
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if(!decoded){
            return res.status(401).json({message:"unauthorized - invalid token"});
        }

       const user = await User.findById(decoded.id);
       
        
       if(!user){
           return res.status(401).json({message:"unauthorized - user not found"});
       }
       req.user = user;
      
        next();
        
    } catch (error) {
        res.status(401).json({message:"Internal server error"});
    }
}

export default protectedRoute
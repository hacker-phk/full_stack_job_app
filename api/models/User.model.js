import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

// Define the schema for the user
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,  // Ensure username is unique
    trim: true,
    minlength: [4, 'Username must be at least 4 characters long'],  // Min length for username
  },
  password: {
    type: String,
    required: true,
    minlength: [6, 'Password must be at least 6 characters long'], // Min length for password
  }
}, {
  timestamps: true, // Adds createdAt and updatedAt timestamps
});


// Create a User model
const User = mongoose.model('User', userSchema);

export default User; ;

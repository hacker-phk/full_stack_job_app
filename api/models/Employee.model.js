import mongoose from 'mongoose';

// Define the schema for the employee form
const employeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true, // Ensure email is unique
    match: [/.+@.+\..+/, 'Please enter a valid email address'], // Email validation regex
  },
  mobileNo: {
    type: String,
    required: true,
    match: [/^\d{10}$/, 'Please enter a valid 10-digit mobile number'], // Numeric validation
  },
  designation: {
    type: String,
    enum: ['HR', 'Manager', 'Sales'], // Restrict to specific roles
    required: true,
  },
  gender: {
    type: String,
    enum: ['male', 'female'], // Restrict to Male/Female
    required: true,
  },
  courses: {
    type: [String],
    enum: ['MCA', 'BCA', 'BSC'], // Restrict to specific courses
  },
  imgUpload: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return /\.(jpg|jpeg|png)$/i.test(v); // Validate file type
      },
      message: 'Only jpg/png files are allowed',
    },
  },
}, {
  timestamps: true, // Adds createdAt and updatedAt timestamps
});

// Export the Employee model
const Employee = mongoose.model('Employee', employeeSchema);
export default Employee;

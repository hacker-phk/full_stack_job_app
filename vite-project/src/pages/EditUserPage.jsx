import React, { useEffect } from 'react'
import { useEditUser } from '@/context/UserContext'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button} from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import axios from 'axios'
import handleImageChange from '@/Helpers/ImageUpload'
import editEmployee from '@/Helpers/editData'

import Toast from '@/Helpers/ToastDemo'


function EditUserPage() {
    const { user, editUser } = useEditUser();
    const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [toast, setToast] = useState({ message: '', type: '', show: false });
  

  const [mobile, setMobile] = useState(user.mobileNo);
  const [designation, setDesignation] = useState(user.designation);
  const [gender, setGender] = useState(user.gender);
  const [courses, setCourses] = useState({
    MCA: user.courses.includes("MCA"),
    BCA: user.courses.includes("BCA"),
    BSC: user.courses.includes("BSC"),
  });
  const [image, setImage] = useState(user.imgUpload);
  const [imageError, setImageError] = useState("");
  const[designationError, setDesignationError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  
  const isValidPhoneNumber = (phoneNumber) => {
    // Regex for validating a 10-digit phone number (with optional spaces, hyphens, or parentheses)
    const phoneRegex = /^(?:\(?\d{3}\)?[-.\s]?)?\d{3}[-.\s]?\d{4}$/;
    return phoneRegex.test(phoneNumber);
  };
  const validateAll=()=>{
    if(!name || !email || !mobile || !designation || !gender){
      alert("Please fill all the fields");
      return false;
    }

    if(!image){ 
      alert("Please upload an image");
      return false;
    }
    // Validate phone number before submitting
    if (!isValidPhoneNumber(mobile) || mobile.length < 10 || mobile.length > 15) {
      setPhoneError("Please enter a valid phone number.");
      return false; // Prevent form submission
    }
    else{
      setPhoneError("");
      
    }
    if(!designation){
      setDesignationError("Please enter a designation.");
      return false;
    }
    else{
      setDesignationError("");
    }

    return true;

  }
  const handleSubmit = async (e) => {

    e.preventDefault();
    if(!validateAll()) return;
    // Prepare data to send
    const employeeData = {
      Id: user._id,
      name,
      email,
      mobile,
      designation,
      gender,
      courses: Object.keys(courses).filter(course => courses[course]),
      image,
    };
          

    editEmployee(employeeData, toast, setToast);
  };
  const handleCourseChange = (course) => {
    setCourses((prevCourses) => ({
      ...prevCourses,
      [course]: !prevCourses[course],
    }));
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      {toast.show && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast({ ...toast, show: false })}
        />
      )}
    <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Edit Employee</h2>
      
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <Label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</Label>
          <Input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <Label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <Label htmlFor="mobile" className="block text-sm font-medium text-gray-700">Mobile No</Label>
          <Input
            id="mobile"
            type="text"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {phoneError && <p className="text-sm text-red-500 mt-2">{phoneError}</p>}
        </div>
        <div>
          <Label htmlFor="designation" className="block text-sm font-medium text-gray-700">Designation</Label>
          <select
            id="designation"
            value={designation}
            onChange={(e) => setDesignation(e.target.value)}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Designation</option>
            <option value="HR">HR</option>
            <option value="Manager">Manager</option>
            <option value="Sales">Sales</option>
          </select>
          {designationError && <p className="text-sm text-red-500 mt-2">{designationError}</p>}
        </div>
        
        <div className="flex items-center space-x-4">
          <Label className="block text-sm font-medium text-gray-700">Gender</Label>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <input
                id="gender-male"
                type="radio"
                name="gender"
                value="male"
                checked={gender === "male"}
                onChange={() => setGender("male")}
                className="h-4 w-4 text-blue-500 focus:ring-blue-500"
              />
              <label htmlFor="gender-male" className="text-sm text-gray-700">Male</label>
            </div>
            <div className="flex items-center space-x-1">
              <input
                id="gender-female"
                type="radio"
                name="gender"
                value="female"
                checked={gender === "female"}
                onChange={() => setGender("female")}
                className="h-4 w-4 text-blue-500 focus:ring-blue-500"
              />
              <label htmlFor="gender-female" className="text-sm text-gray-700">Female</label>
            </div>
          </div>
        </div>
        <div>
          <Label className="block text-sm font-medium text-gray-700">Courses</Label>
          <div className="space-y-2">
            {["MCA", "BCA", "BSC"].map((course) => (
              <div key={course} className="flex items-center">
                <input
                  type="checkbox"
                  id={course}
                  checked={courses[course]}
                  onChange={() => handleCourseChange(course)}
                  className="h-4 w-4 text-blue-500 focus:ring-blue-500"
                />
                <label htmlFor={course} className="ml-2 text-sm text-gray-700">{course}</label>
              </div>
            ))}
          </div>
        </div>
        <div>
          <Label htmlFor="image" className="block text-sm font-medium text-gray-700">Image Upload</Label>
          <Input
            id="image"
            type="file"
            onChange={(e)=>handleImageChange(e,setImage,setImageError)}
            accept="image/*"
            className="mt-1 w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {imageError && <p className="text-sm text-red-500 mt-2">{imageError}</p>}
        </div>
        <div className="mt-6">
          <Button type="submit" className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700">Submit</Button>
        </div>
      </form>
    </div>
  </div>
  )
}

export default EditUserPage
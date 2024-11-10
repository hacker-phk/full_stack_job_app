import axios from "axios";

async function submitEmployee(employeeData, toast,setToast) {
  try {
    const response = await axios.post(
      'http://localhost:5000/employee',
      employeeData,
      {
        withCredentials: true, // Ensure this is in the config object
      }
    );
    // Handle success here (if needed)
    setToast({ message: 'Employee added successfully!', type: 'success', show: true });
  } catch (error) {
    console.log(error.response)
    if (error.response) {
      setToast({ message: 'Failed to add employee.', type: 'error', show: true });

    }
  }
}

export default submitEmployee;

import axios from "axios";

async function editEmployee(employeeData, toast, setToast) {
    try {
      const response = await axios.post('http://localhost:5000/employee/edit', employeeData,{
        withCredentials: true
      });
      // Handle success here (if needed)
      setToast({ message: 'Employee updated successfully!', type: 'success', show: true });
    } catch (error) {
      if (error.response) {
        const errorMessage = error.response.data?.message || "An error occurred while adding the employee.";
        
        setToast({ message: errorMessage, type: 'error', show: true });
      } else {
        setToast({ message: 'An error occurred while adding the employee.', type: 'error', show: true });
      }
    }
  }
  
  export default editEmployee;
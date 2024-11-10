import React, { useState } from 'react';
import useGetEmployee from '../hooks/useGetEmployee.js';
import { Link } from 'react-router-dom';
import { useEditUser } from '@/context/UserContext.jsx';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Toast from './ToastDemo.jsx';

function EmployeeList() {
  const [searchTerm, setSearchTerm] = useState('');
  const { data, loading, reFetch } = useGetEmployee('http://localhost:5000/employee');
  const { editUser } = useEditUser();
  const navigate = useNavigate();
  const [toast, setToast] = useState({ message: '', type: '', show: false });

  function handleEdit(employee) {
    editUser(employee);
    navigate('/edit');
  }

  async function handleDelete(e, id) {
    e.preventDefault();
    try {
      console.log(id);
      const response = await axios.delete(`http://localhost:5000/employee/delete/${id}`, {
        withCredentials: true,
      });
      console.log('Employee deleted:', response.data);
      setToast({ message: 'Employee deleted successfully!', type: 'success', show: true });
    reFetch();
      // Re-fetch employee list to update UI after deletion
    } catch (err) {
      console.error('Error deleting employee:', err.response?.data || err.message);
    }
  }

  const filteredEmployees = data?.filter(employee =>
    employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <p>Loading...</p>;
  if(!data) return <p>No data</p>;

  return (
    <div className='p-5'>
       {toast.show && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast({ ...toast, show: false })}
        />
      )}
      <table className="table-auto w-full border-collapse border border-gray-200">
        <thead>
          <tr>
            <th colSpan="10" className="text-center text-xl p-4">Employee List</th>
          </tr>
          <tr>
            <th colSpan="2" className="p-2">Total Count: {filteredEmployees?.length}</th>
            <th colSpan="8" className="p-2 text-right">
              <button className="bg-blue-500 text-white py-1 px-3 rounded">
                <Link to="/addEmployee">Add Employee</Link>
              </button>
            </th>
          </tr>
          <tr>
            <th colSpan="2" className="p-2">Search by Email</th>
            <th colSpan="8" className="p-2">
              <input
                type="text"
                placeholder="Enter email or name"
                className="border rounded p-2 w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </th>
          </tr>
          <tr>
            <th className="border p-2">Unique ID</th>
            <th className="border p-2">Image</th>
            <th className="border p-2">Name</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Mobile No</th>
            <th className="border p-2">Designation</th>
            <th className="border p-2">Gender</th>
            <th className="border p-2">Courses</th>
            <th className="border p-2">Created Date</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredEmployees && filteredEmployees.length === 0 && <tr><td colSpan="10" className="border p-2 text-center min-h-screen h-[400px]">No employees found</td></tr>}
          {filteredEmployees && filteredEmployees.map((employee) => (
            <tr key={employee._id}>
              <td className="border p-2">{employee._id}</td>
              <td className="border p-2">
                <img src={`http://localhost:5000/uploads/${employee.imgUpload}`} alt={employee.name} className="w-12 h-12 rounded-full" />
              </td>
              <td className="border p-2">{employee.name}</td>
              <td className="border p-2">{employee.email}</td>
              <td className="border p-2">{employee.mobileNo}</td>
              <td className="border p-2">{employee.designation}</td>
              <td className="border p-2">{employee.gender}</td>
              <td className="border p-2">{employee.courses.join(', ')}</td>
              <td className="border p-2">{new Date(employee.updatedAt).toLocaleDateString()}</td>
              <td className="border p-2">
                <button className="bg-yellow-500 text-white py-1 px-3 rounded" onClick={() => handleEdit(employee)}>Edit</button>
                <button className="bg-red-500 text-white py-1 px-3 rounded ml-2" onClick={(e) => handleDelete(e, employee._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default EmployeeList;

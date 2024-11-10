import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import Toast from '@/Helpers/ToastDemo';
// import  ToastDemo  from '@/Helpers/ToastDemo';

const LoginPage = ({setUsername}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [toast, setToast] = useState({ message: '', type: '', show: false });


  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post('http://localhost:5000/auth/login', {
        username: event.target.username.value,
        password: event.target.password.value,
      });

      
      Cookies.set('token', response.data.token);
      localStorage.setItem('token', response.data.name);
      setToast({ message: 'Employee deleted successfully!', type: 'success', show: true });
      setUsername(response.data.name); // Handle the response appropriately (e.g., store token, redirect, etc.)
      setLoading(false);
      navigate('/');
    } catch (err) {
      setLoading(false);
      setError('Login failed. Please try again.');
      console.error(err);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
       {toast.show && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast({ ...toast, show: false })}
        />
      )}
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-gray-800">Login</h2>

        {error && <div className="text-red-500 text-center">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Username Field */}
          {/* <ToastDemo /> */}
          <div>
            <Label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-700">
              Username
            </Label>
            <Input
              type="text"
              id="username"
              name="username"
              required
              placeholder="Enter your username"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Password Field */}
          <div>
            <Label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-700">
              Password
            </Label>
            <Input
              type="password"
              id="password"
              name="password"
              required
              placeholder="Enter your password"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Login Button */}
          <Button
            type="submit"
            disabled={loading}
            className={`w-full py-2 mt-4 text-white ${loading ? 'bg-gray-500' : 'bg-blue-600'} rounded-md hover:bg-blue-700`}
          >
            {loading ? 'Logging in...' : 'Login'}
          </Button>
        </form>

        {/* Register Link */}
        <div className="text-center">
          <p className="text-sm text-gray-500">
            Don't have an account?{' '}
            <a
              href="/register"
              className="text-blue-500 underline hover:text-blue-600"
            >
              Register
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

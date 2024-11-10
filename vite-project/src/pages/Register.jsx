import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Register() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault(); // Prevent default form submission behavior

        // Set loading state to true while the request is in progress
        setLoading(true);
        setError(null); // Reset any previous errors

        // Capture username and password from form
        const username = event.target.username.value;
        const password = event.target.password.value;

        try {
            // Make a POST request to the /register endpoint
            const response = await axios.post('http://localhost:5000/auth/register', {
                username,
                password,
            });

            // Handle successful response (e.g., redirect, show message, etc.)

            // Reset the form and state after successful registration
            event.target.reset();
            setLoading(false);

            // Redirect to the login page
            navigate('/login');
        } catch (err) {
            // Handle error (e.g., display error message)
            setLoading(false);
            setError('Registration failed. Please try again.');
            console.error(err);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold text-center text-gray-800">Register</h2>

                {error && <div className="text-red-500 text-center">{error}</div>} {/* Display error message */}

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Username Field */}
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

                    {/* Register Button */}
                    <Button
                        type="submit"
                        disabled={loading} // Disable button while loading
                        className={`w-full py-2 mt-4 text-white ${loading ? 'bg-gray-500' : 'bg-blue-600'} rounded-md hover:bg-blue-700`}
                    >
                        {loading ? 'Registering...' : 'Register'}
                    </Button>
                </form>
            </div>
        </div>
    );
}

export default Register;

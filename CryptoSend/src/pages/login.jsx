// src/pages/Login.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import axios from 'axios'; // Import Axios for making API requests

const Login = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Hook to navigate programmatically

  const handleLogin = async (e) => {
    e.preventDefault();

    // Simple validation (for example purposes)
    if (!email || !password) {
      setError('Please enter both email and password');
      return;
    }

    onLoginSuccess();
    navigate('/home');

    try {
      // Make API call using Axios
      const response = await axios.post('https://your-api-endpoint.com/login', {
        email,
        password,
      });

      if (response.status === 200) {
        // Save login status to localStorage
        localStorage.setItem('isLoggedIn', 'true');

        // Call the login success function passed from App.jsx
        onLoginSuccess();
        navigate('/home');
      }
    } catch (error) {
      // Handle error if the user is not found or credentials are invalid
      if (error.response && error.response.status === 401) {
        setError('Invalid credentials, please try again.');
      } else {
        setError('An error occurred. Please try again later.');
      }
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-blue-950 to-purple-950 w-screen">
      <div className="bg-white p-8 rounded-lg shadow-lg w-80 max-w-md">
        <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {error && <div className="text-red-500 mb-4">{error}</div>}

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600 transition duration-200"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;

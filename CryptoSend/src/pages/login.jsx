import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [otp, setOtp] = useState(''); // State to store the OTP input by the user
  const [otpError, setOtpError] = useState(''); // State to store OTP error message
  const [showOtpModal, setShowOtpModal] = useState(false); // State to control OTP modal visibility
  const [userId, setUserId] = useState(null); // State to store the user_id
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      setError('Please enter both username and password');
      return;
    }

    try {
      const response = await axios.post(
        `https://personal-qjduceog.outsystemscloud.com/FA/rest/users_by_api_key/post_login_success?username=${encodeURIComponent(
          username
        )}&password=${encodeURIComponent(password)}`
      );

      if (response.status === 200) {
        // Store user_id and other necessary data
        const userId = response.data.user_id;
        localStorage.setItem('user_id', userId);
        setUserId(userId);
        setShowOtpModal(true);
        getUserDetails(userId);
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setError('Invalid credentials, please try again.');
      } else {
        setError('An error occurred. Please try again later.');
      }
    }
  };

  const getUserDetails = async (userId) => {
    try {
      const response = await axios.get(
        `https://personal-qjduceog.outsystemscloud.com/FA/rest/users_by_api_key/get_user_detail`,
        {
          params: {
            user_Id: userId,
          },
        }
      );

      if (response.status === 200) {
        // Store user details
        localStorage.setItem('username', response.data.Username);
      }
    } catch (error) {
      setError('An error occurred. Please try again later.');
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();

    if (!otp || !userId) {
      setOtpError('Please enter a valid OTP');
      return;
    }

    try {
      const response = await axios.post(
        `https://personal-qjduceog.outsystemscloud.com/FA/rest/users_by_api_key/confirm_otp`,
        null,
        {
          params: {
            user_id: userId,
            otp_code: otp,
          },
        }
      );

      if (response.status === 200) {
        onLoginSuccess();
        localStorage.setItem('isLoggedIn', 'true');
        navigate('/home');
      } else {
        setOtpError('Incorrect OTP, please try again.');
      }
    } catch (error) {
      setOtpError('An error occurred while verifying OTP.');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-blue-950 to-purple-950 w-[400px]">
      <h1 className="absolute top-32 justify-center items-center text-xl text-white font-bold">
        PAYGPal
      </h1>
      <div className="bg-white p-8 rounded-lg shadow-lg w-80 max-w-md">
        <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-gray-700">Username</label>
            <input
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
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

      {showOtpModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded-lg shadow-lg w-80 max-w-md">
            <h2 className="text-2xl font-semibold text-center mb-6">
              Enter OTP
            </h2>
            <form onSubmit={handleOtpSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700">OTP Code</label>
                <input
                  type="text"
                  placeholder="Enter 4 digit OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  maxLength="4"
                  required
                  className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {otpError && <div className="text-red-500 mb-4">{otpError}</div>}

              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600 transition duration-200"
              >
                Submit OTP
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;

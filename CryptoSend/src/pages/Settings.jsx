import { useNavigate } from 'react-router-dom';
import TabBar from '../components/ui/TabBar';

export default function Settings() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Handle the logout logic here (e.g., clearing tokens, resetting states)
    navigate('/login'); // Redirect to login page after logging out
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-[400px] bg-gray-100">
      <h2 className="text-4xl font-semibold mb-4">Settings</h2>

      <button
        onClick={handleLogout}
        className="px-6 py-3 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-200"
      >
        Logout
      </button>
      <TabBar />
    </div>
  );
}

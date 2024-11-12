// src/components/TabBar.jsx
import React from 'react';
import { Home as HomeIcon, BarChart2, Wallet, Settings } from 'lucide-react';
import { Button } from '../ui/Button';
import { Link, useLocation } from 'react-router-dom'; // Import Link and useLocation

export default function TabBar() {
  const location = useLocation();

  // Define routes and active status for each tab
  const tabs = [
    { icon: HomeIcon, label: 'Home', path: '/home' },
    { icon: BarChart2, label: 'Markets', path: '/markets' },
    { icon: Settings, label: 'Settings', path: '/settings' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-800 mx-auto w-[400px]">
      <div className="flex justify-around items-center h-16">
        {tabs.map(({ icon: Icon, label, path }) => {
          const isActive = location.pathname === path;
          return (
            <Link to={path} key={label} className="w-full">
              <Button
                variant="ghost"
                className={`
                  flex flex-col items-center justify-center h-16 w-full rounded-none
                  ${
                    isActive
                      ? 'text-purple-400'
                      : 'text-gray-400 hover:text-purple-400'
                  }
                  transition-colors duration-200
                `}
              >
                <Icon className="w-6 h-6 mb-1" />
                <span className="text-xs">{label}</span>
              </Button>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

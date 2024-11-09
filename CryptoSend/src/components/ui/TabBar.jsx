import React from 'react';
import { Home as HomeIcon, BarChart2, Wallet, Settings } from 'lucide-react';
import { Button } from '../ui/Button';

export default function TabBar() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-800 w-full max-w-md mx-auto">
      <div className="flex justify-around items-center h-16">
        {[
          { icon: HomeIcon, label: 'Home', isActive: true },
          { icon: BarChart2, label: 'Markets', isActive: false },
          { icon: Wallet, label: 'Wallet', isActive: false },
          { icon: Settings, label: 'Settings', isActive: false },
        ].map(({ icon: Icon, label, isActive }) => (
          <Button
            key={label}
            variant="ghost"
            className={`
              flex flex-col items-center justify-center h-16 w-full rounded-none
              ${isActive ? 
                'text-purple-400' : 
                'text-gray-400 hover:text-purple-400'
              }
              transition-colors duration-200
            `}
          >
            <Icon className="w-6 h-6 mb-1" />
            <span className="text-xs">{label}</span>
          </Button>
        ))}
      </div>
    </nav>
  );
}
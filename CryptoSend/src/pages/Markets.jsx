import { Bell, Search } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/Avatar';
import { Button } from '../components/ui/Button';
import TabBar from '../components/ui/TabBar';
import Charts from './crypto-charts/charts';

export default function Markets() {
  const username = localStorage.getItem('username');

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 mx-auto w-[440px]">
      <div className="flex-1 overflow-y-auto pb-20">
        <div className="px-4 py-6">
          <header className="flex justify-between items-center mb-8">
            <div className="flex items-center space-x-3">
              <Avatar className="w-12 h-12 border-2 border-purple-500">
                <AvatarFallback>{username[0]}</AvatarFallback>
              </Avatar>
              <div>
                <h2 className="font-semibold text-white text-lg">
                  Welcome back
                </h2>
                <p className="text-sm text-gray-400">{username}</p>
              </div>
            </div>
            <div className="flex space-x-2"></div>
          </header>

          {/* CryptoSend Logo */}
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 mb-8">
            PAYGPal
          </h1>

          <Charts />
        </div>
      </div>

      {/* Bottom Navigation Bar */}
      <TabBar />
    </div>
  );
}

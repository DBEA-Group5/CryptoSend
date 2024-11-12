import {
  Bell,
  Building2,
  CreditCard,
  PieChart,
  Plus,
  Search,
  Send,
  Wallet,
} from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/Avatar';
import { Button } from '../components/ui/Button';
import { Card, CardContent } from '../components/ui/Card';
import { Progress } from '../components/ui/Progress';
import TabBar from '../components/ui/TabBar';
import Transactions from './Transactions';
import WalletCard from './Wallet';

export default function Home() {
  const navigate = useNavigate();
  const username = localStorage.getItem('username');

  const handleSendMoney = () => {
    navigate('/convert');
  };

  const handleAddMoney = () => {
    navigate('/addMoney');
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 w-[400px] mx-auto">
      <div className="flex-1 overflow-y-auto pb-20">
        <div className="px-4 py-6 ">
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

          {/* Balance Card */}
          <WalletCard></WalletCard>

          {/* Quick Actions */}
          <section className="mb-8">
            <h3 className="text-xl text-white font-bold mb-4">Quick Actions</h3>
            <div className="grid grid-cols-3 gap-4">
              <Button
                variant="outline"
                className="h-auto py-4 flex flex-col items-center justify-center bg-gray-800 border-gray-700 hover:bg-gray-700 transition-colors"
                onClick={handleSendMoney}
              >
                <Send className="w-6 h-6 mb-2 text-purple-400" />
                <span className="text-white">Send</span>
              </Button>
              <Button
                variant="outline"
                className="h-auto py-4 flex flex-col items-center justify-center bg-gray-800 border-gray-700 hover:bg-gray-700 transition-colors"
                onClick={handleAddMoney}
              >
                <Plus className="w-6 h-6 mb-2 text-purple-400" />
                <span className="text-white">Add Money</span>
              </Button>
              <Button
                variant="outline"
                className="h-auto py-4 flex flex-col items-center justify-center bg-gray-800 border-gray-700 hover:bg-gray-700 transition-colors"
              >
                <Wallet className="w-6 h-6 mb-2 text-purple-400" />
                <span className="text-white">Withdraw</span>
              </Button>
            </div>
          </section>

          {/* Crypto Portfolio */}
          <Transactions></Transactions>

          {/* Bottom Navigation Bar */}
          <TabBar />
        </div>
      </div>
    </div>
  );
}

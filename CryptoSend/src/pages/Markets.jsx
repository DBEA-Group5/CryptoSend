import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Bell,
  Search,
  CreditCard,
  PieChart,
  Building2,
  HelpCircle,
  Twitter,
  ArrowUpRight,
  ArrowDownRight,
  Wallet,
  Send,
  Plus,
  ChevronRight,
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/Avatar';
import { Button } from '../components/ui/Button';
import { Card, CardContent } from '../components/ui/Card';
import { Progress } from '../components/ui/Progress';
import Charts from './crypto-charts/charts';
import TabBar from '../components/ui/TabBar';
import WalletCard from './Wallet';

export default function Markets() {
  const [isConvertVisible, setIsConvertVisible] = useState(false);

  const handleLogout = () => {
    // Handle the logout logic here (e.g., clearing tokens, resetting states)
    navigate('/login'); // Redirect to login page after logging out
  };

  const navigate = useNavigate();
  const [cryptoData, setCryptoData] = useState([
    { name: 'Bitcoin', symbol: 'BTC', price: 45000, change: 2.5 },
    { name: 'Ethereum', symbol: 'ETH', price: 3200, change: -1.2 },
    { name: 'Cardano', symbol: 'ADA', price: 1.5, change: 5.7 },
  ]);

  const handleSendMoney = () => {
    navigate('/convert');
  };

  const handleAddMoney = () => {
    navigate('/addMoney');
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 mx-auto w-[400px]">
      <div className="flex-1 overflow-y-auto pb-20">
        <div className="px-4 py-6">
          <header className="flex justify-between items-center mb-8">
            <div className="flex items-center space-x-3">
              <Avatar className="w-12 h-12 border-2 border-purple-500">
                <AvatarImage src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?fit=crop&w=300&h=300&q=80" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div>
                <h2 className="font-semibold text-white text-lg">
                  Welcome back
                </h2>
                <p className="text-sm text-gray-400">John Doe</p>
              </div>
            </div>
            <div className="flex space-x-2">
              <Button
                size="lg"
                variant="ghost"
                className="text-gray-400 hover:text-purple-500 hover:bg-purple-500/10 p-2"
              >
                <Bell className="w-8 h-8" />
              </Button>
              <Button
                size="lg"
                variant="ghost"
                className="text-gray-400 hover:text-purple-500 hover:bg-purple-500/10 p-2"
              >
                <Search className="w-8 h-8" />
              </Button>
            </div>
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

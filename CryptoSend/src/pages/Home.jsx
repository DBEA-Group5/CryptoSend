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
import Transactions from './Transactions';

export default function Home() {
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
    <div className="flex flex-col min-h-screen bg-gray-900 w-[400px] mx-auto">
      <div className="flex-1 overflow-y-auto pb-20">
        <div className="px-4 py-6 ">
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

          {/* Investment Goal */}
          <section className="mb-8">
            <h3 className="text-xl text-white font-bold mb-4">
              Investment Goal
            </h3>
            <Card className="bg-gray-800 text-white overflow-hidden">
              <CardContent className="p-4">
                <div className="flex justify-between items-center mb-2">
                  <p className="font-semibold">Monthly Goal</p>
                  <p className="text-sm text-gray-400">$800 / $1000</p>
                </div>
                <Progress
                  value={80}
                  className="h-2 mb-2 bg-purple-900 [&::-webkit-progress-value]:bg-purple-400"
                />
                <p className="text-sm text-gray-400">
                  You're 80% of the way there!
                </p>
              </CardContent>
            </Card>
          </section>

          {/* My apps section */}
          <section className="mb-8">
            <h3 className="text-xl text-white font-bold mb-4">My Apps</h3>
            <div className="grid grid-cols-3 gap-4">
              {[
                {
                  icon: CreditCard,
                  label: 'Wallet',
                  color: 'from-purple-500 to-indigo-500',
                },
                {
                  icon: PieChart,
                  label: 'Analytics',
                  color: 'from-pink-500 to-rose-500',
                },
                {
                  icon: Building2,
                  label: 'Retail',
                  color: 'from-orange-500 to-amber-500',
                },
              ].map(({ icon: Icon, label, color }) => (
                <Card
                  key={label}
                  className={`bg-gradient-to-br ${color} hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1`}
                >
                  <CardContent className="p-4 flex flex-col items-center justify-center">
                    <Icon className="w-8 h-8 text-white mb-2" />
                    <span className="text-sm font-medium text-white">
                      {label}
                    </span>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
          {/* Bottom Navigation Bar */}
          <TabBar />
        </div>
      </div>
    </div>
  );
}

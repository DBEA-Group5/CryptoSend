import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, DollarSign, TrendingUp, TrendingDown, Info, Download, HeadphonesIcon } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/Avatar';
import { Button } from '../components/ui/Button';
import { Card, CardContent } from '../components/ui/Card';

export default function BalanceDetails() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 p-6 max-w-md mx-auto">
      {/* Header */}
      <header className="flex justify-between items-center mb-8">
        <Button variant="ghost" className="text-white hover:bg-gray-800" onClick={() => navigate('/')}>
          <ArrowLeft className="w-6 h-6 mr-2" />
          Back
        </Button>
        <Avatar className="w-12 h-12 border-2 border-purple-500">
          <AvatarImage src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?fit=crop&w=300&h=300&q=80" />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
      </header>

      {/* Balance Overview */}
      <Card className="mb-8 bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 text-white border-none overflow-hidden relative">
        <div className="absolute inset-0 bg-black opacity-10 z-0"></div>
        <CardContent className="p-6 relative z-10">
          <h2 className="text-2xl font-bold mb-2">Total Balance</h2>
          <p className="text-4xl font-bold mb-4">$12,345.67</p>
          <div className="flex items-center text-sm bg-white/20 px-2 py-1 rounded-full w-fit">
            <TrendingUp className="w-4 h-4 mr-1" />
            <span>+2.5% from last month</span>
          </div>
        </CardContent>
      </Card>

      {/* Balance Breakdown */}
      <section className="mb-8">
        <h3 className="text-xl text-white font-bold mb-4">Balance Breakdown</h3>
        <div className="space-y-4">
          {[
            { icon: DollarSign, title: 'Available Balance', subtitle: 'Ready to use', amount: '$10,234.56', color: 'text-green-400' },
            { icon: TrendingUp, title: 'Invested Amount', subtitle: 'Stocks & Crypto', amount: '$2,111.11', color: 'text-blue-400' },
          ].map((item, index) => (
            <Card key={index} className="bg-gray-800 text-white hover:bg-gray-700 transition-colors">
              <CardContent className="p-4 flex justify-between items-center">
                <div className="flex items-center">
                  <item.icon className={`w-6 h-6 mr-3 ${item.color}`} />
                  <div>
                    <p className="font-semibold">{item.title}</p>
                    <p className="text-sm text-gray-400">{item.subtitle}</p>
                  </div>
                </div>
                <p className="text-xl font-bold">{item.amount}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Recent Transactions */}
      <section className="mb-8">
        <h3 className="text-xl text-white font-bold mb-4">Recent Transactions</h3>
        <div className="space-y-4">
          {[
            { icon: TrendingDown, title: 'Online Purchase', subtitle: 'Amazon.com', amount: '-$89.99', color: 'text-red-400' },
            { icon: TrendingUp, title: 'Salary Deposit', subtitle: 'Employer Inc.', amount: '+$3,500.00', color: 'text-green-400' },
          ].map((transaction, index) => (
            <Card key={index} className="bg-gray-800 text-white hover:bg-gray-700 transition-colors">
              <CardContent className="p-4 flex justify-between items-center">
                <div className="flex items-center">
                  <transaction.icon className={`w-6 h-6 mr-3 ${transaction.color}`} />
                  <div>
                    <p className="font-semibold">{transaction.title}</p>
                    <p className="text-sm text-gray-400">{transaction.subtitle}</p>
                  </div>
                </div>
                <p className={`text-xl font-bold ${transaction.color}`}>{transaction.amount}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Additional Information */}
      <Card className="bg-gray-800 text-white mb-8 hover:bg-gray-700 transition-colors">
        <CardContent className="p-4 flex items-start">
          <Info className="w-6 h-6 mr-3 text-blue-400 flex-shrink-0 mt-1" />
          <p className="text-sm">
            Your balance includes all your accounts and investments. Tap on any item to see more details or to make changes.
          </p>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-4 mt-auto">
        <Button variant="outline" className="text-white border-purple-500 hover:bg-purple-500 transition-colors">
          <Download className="w-4 h-4 mr-2" />
          Download Statement
        </Button>
        <Button className="bg-purple-500 text-white hover:bg-purple-600 transition-colors">
          <HeadphonesIcon className="w-4 h-4 mr-2" />
          Contact Support
        </Button>
      </div>
    </div>
  );
}
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, DollarSign, TrendingUp, TrendingDown, Info } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/Avatar';
import { Button } from '../components/ui/Button';
import { Card, CardContent } from '../components/ui/Card';

export default function BalanceDetails() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 p-4 max-w-md mx-auto">
      {/* Header */}
      <header className="flex justify-between items-center mb-8">
        <Button variant="ghost" className="text-white" onClick={() => navigate('/')}>
          <ArrowLeft className="w-6 h-6 mr-2" />
          Back
        </Button>
        <Avatar className="w-10 h-10 border-2 border-purple-500">
          <AvatarImage src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?fit=crop&w=300&h=300&q=80" />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
      </header>

      {/* Balance Overview */}
      <Card className="mb-8 bg-gradient-to-r from-purple-500 to-indigo-600 text-white border-none">
        <CardContent className="p-6">
          <h2 className="text-2xl font-bold mb-2">Total Balance</h2>
          <p className="text-4xl font-bold mb-4">$12,345.67</p>
          <div className="flex items-center text-sm">
            <TrendingUp className="w-4 h-4 mr-1" />
            <span>+2.5% from last month</span>
          </div>
        </CardContent>
      </Card>

      {/* Balance Breakdown */}
      <section className="mb-8">
        <h3 className="text-xl text-white font-bold mb-4">Balance Breakdown</h3>
        <div className="space-y-4">
          <Card className="bg-gray-800 text-white">
            <CardContent className="p-4 flex justify-between items-center">
              <div className="flex items-center">
                <DollarSign className="w-6 h-6 mr-2 text-green-400" />
                <div>
                  <p className="font-semibold">Available Balance</p>
                  <p className="text-sm text-gray-400">Ready to use</p>
                </div>
              </div>
              <p className="text-xl font-bold">$10,234.56</p>
            </CardContent>
          </Card>
          <Card className="bg-gray-800 text-white">
            <CardContent className="p-4 flex justify-between items-center">
              <div className="flex items-center">
                <TrendingUp className="w-6 h-6 mr-2 text-blue-400" />
                <div>
                  <p className="font-semibold">Invested Amount</p>
                  <p className="text-sm text-gray-400">Stocks & Crypto</p>
                </div>
              </div>
              <p className="text-xl font-bold">$2,111.11</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Recent Transactions */}
      <section className="mb-8">
        <h3 className="text-xl text-white font-bold mb-4">Recent Transactions</h3>
        <div className="space-y-4">
          <Card className="bg-gray-800 text-white">
            <CardContent className="p-4 flex justify-between items-center">
              <div className="flex items-center">
                <TrendingDown className="w-6 h-6 mr-2 text-red-400" />
                <div>
                  <p className="font-semibold">Online Purchase</p>
                  <p className="text-sm text-gray-400">Amazon.com</p>
                </div>
              </div>
              <p className="text-xl font-bold text-red-400">-$89.99</p>
            </CardContent>
          </Card>
          <Card className="bg-gray-800 text-white">
            <CardContent className="p-4 flex justify-between items-center">
              <div className="flex items-center">
                <TrendingUp className="w-6 h-6 mr-2 text-green-400" />
                <div>
                  <p className="font-semibold">Salary Deposit</p>
                  <p className="text-sm text-gray-400">Employer Inc.</p>
                </div>
              </div>
              <p className="text-xl font-bold text-green-400">+$3,500.00</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Additional Information */}
      <Card className="bg-gray-800 text-white mb-8">
        <CardContent className="p-4 flex items-start">
          <Info className="w-6 h-6 mr-2 text-blue-400 flex-shrink-0 mt-1" />
          <p className="text-sm">
            Your balance includes all your accounts and investments. Tap on any item to see more details or to make changes.
          </p>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-4 mt-auto">
        <Button variant="outline" className="text-white border-purple-500 hover:bg-purple-500">
          Download Statement
        </Button>
        <Button className="bg-purple-500 text-white hover:bg-purple-600">
          Contact Support
        </Button>
      </div>
    </div>
  );
}
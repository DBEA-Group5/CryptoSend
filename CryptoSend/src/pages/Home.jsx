import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Bell,
  Search,
  CreditCard,
  PieChart,
  Building2,
  HelpCircle,
  Twitter,
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/Avatar';
import { Button } from '../components/ui/Button';
import { Card, CardContent } from '../components/ui/Card';
import { Modal, Select, Input, Drawer, Flex, Spin, Switch } from 'antd';
import Convert from './convert-money/convert';
import Charts from './crypto-charts/charts';

export default function Home() {
  const [isConvertVisible, setIsConvertVisible] = useState(false);

  const showConvertDrawer = () => {
    setIsConvertVisible(true);
  };

  const handleCloseConvertDrawer = () => {
    setIsConvertVisible(false);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 p-4 max-w-md mx-auto">
      {/* Header */}
      <header className="flex justify-between items-center mb-8">
        <div className="flex items-center space-x-2">
          <Avatar className="w-10 h-10 border-2 border-purple-500">
            <AvatarImage src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?fit=crop&w=300&h=300&q=80" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div>
            <h2 className="font-semibold text-white">Welcome back</h2>
            <p className="text-sm text-gray-500">John Doe</p>
          </div>
        </div>
        <div className="flex space-x-2">
          <Button
            size="icon"
            variant="ghost"
            className="text-gray-500 hover:text-purple-500"
          >
            <Bell className="w-5 h-5" />
          </Button>
          <Button
            size="icon"
            variant="ghost"
            className="text-gray-500 hover:text-purple-500"
          >
            <Search className="w-5 h-5" />
          </Button>
        </div>
      </header>

      {/* CryptoSend Logo */}
      <h1 className="text-4xl font-bold text-purple-600 mb-8">CryptoSend</h1>

      {/* Balance Card */}
      <Card className="mb-8 bg-gradient-to-r from-purple-500 to-indigo-600 text-white border-none">
        <CardContent className="p-6">
          <h3 className="text-lg font-medium mb-2">Total Balance</h3>
          <p className="text-3xl font-bold mb-4">$12,345.67</p>
          <div className="flex justify-between text-sm">
            <span>+2.5% from last month</span>
            <span>View Details</span>
          </div>
        </CardContent>
      </Card>

      {/* My apps section */}
      <section className="mb-8">
        <h3 className="text-xl text-white font-bold mb-4">My Apps</h3>
        <div className="grid grid-cols-3 gap-4">
          <Card className="bg-purple-500 hover:shadow-md transition-shadow">
            <CardContent className="p-4 flex flex-col items-center justify-center">
              <CreditCard className="w-8 h-8 text-white mb-2" />
              <span className="text-sm font-medium text-white">Wallet</span>
            </CardContent>
          </Card>
          <Card className="bg-purple-500 hover:shadow-md transition-shadow">
            <CardContent className="p-4 flex flex-col items-center justify-center">
              <PieChart className="w-8 h-8 text-white mb-2" />
              <span className="text-sm font-medium text-white">Analytics</span>
            </CardContent>
          </Card>
          <Card className="bg-purple-500 hover:shadow-md transition-shadow">
            <CardContent className="p-4 flex flex-col items-center justify-center">
              <Building2 className="w-8 h-8 text-white mb-2" />
              <span className="text-sm font-medium text-white">Retail</span>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="mb-8">
        <h3 className="text-xl text-white font-bold mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 gap-4">
          <Button
            variant="outline"
            className="h-auto py-4 flex flex-col items-center justify-center"
            onClick={showConvertDrawer}
          >
            <CreditCard className="w-6 h-6 mb-2" />
            <span>Transfer</span>
          </Button>
          <Button
            variant="outline"
            className="h-auto py-4 flex flex-col items-center justify-center"
          >
            <CreditCard className="w-6 h-6 mb-2" />
            <span>Add Money</span>
          </Button>
          <Button
            variant="outline"
            className="h-auto py-4 flex flex-col items-center justify-center"
          >
            <PieChart className="w-6 h-6 mb-2" />
            <span>Invest</span>
          </Button>
        </div>
      </section>

      <Convert
        isDrawerVisible={isConvertVisible}
        onClose={handleCloseConvertDrawer}
      />

      <Charts />

      <section className="mb-8">
        <h3 className="text-xl text-white font-bold mb-4">Getting started</h3>
        <Card className="overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1605792657660-596af9009e82?auto=format&fit=crop&w=800&h=320&q=80"
            alt="Cryptocurrency interface on smartphone"
            className="w-full h-40 object-cover"
          />
          <CardContent className="p-4 space-y-4">
            <Button
              variant="ghost"
              className="w-full justify-start hover:bg-purple-50"
            >
              <HelpCircle className="w-5 h-5 mr-2 text-purple-500" />
              <div className="text-left">
                <div className="font-semibold">Help center</div>
                <div className="text-sm text-gray-500">
                  Get started with tutorials
                </div>
              </div>
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start hover:bg-purple-50"
            >
              <Twitter className="w-5 h-5 mr-2 text-purple-500" />
              <div className="text-left">
                <div className="font-semibold">Follow us</div>
                <div className="text-sm text-gray-500">
                  Get our latest updates
                </div>
              </div>
            </Button>
          </CardContent>
        </Card>
      </section>

      {/* Footer */}
      <footer className="mt-auto">
        <Input
          type="text"
          placeholder="Search for features, FAQs, etc."
          className="mb-4"
        />
        <nav className="flex justify-around">
          <Button variant="ghost" className="flex flex-col items-center">
            <CreditCard className="w-5 h-5 mb-1" />
            <span className="text-xs">Cards</span>
          </Button>
          <Button variant="ghost" className="flex flex-col items-center">
            <PieChart className="w-5 h-5 mb-1" />
            <span className="text-xs">Invest</span>
          </Button>
          <Button variant="ghost" className="flex flex-col items-center">
            <HelpCircle className="w-5 h-5 mb-1" />
            <span className="text-xs">Support</span>
          </Button>
        </nav>
      </footer>
    </div>
  );
}
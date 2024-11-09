import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

import { Card, CardContent } from '../components/ui/Card';
import { ChevronRight } from 'lucide-react';
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from '../components/ui/Select'; // Assuming these are custom components

export default function WalletCard() {
  const navigate = useNavigate();
  const [walletBalances, setWalletBalances] = useState([]);
  const [selectedCurrency, setSelectedCurrency] = useState('');
  const [selectedBalance, setSelectedBalance] = useState('');

  // Define gradients for each currency
  const gradientStyles = {
    USD: 'from-green-500 via-blue-500 to-indigo-500',
    SGD: 'from-purple-500 via-pink-500 to-red-500',
    EUR: 'from-yellow-500 via-orange-500 to-red-500',
    THB: 'from-teal-500 via-cyan-500 to-blue-500',
    JPY: 'from-blue-500 via-purple-500 to-pink-500',
    // Add more as needed
  };

  // Fetch wallet balances from API
  const fetchWalletBalances = async (userId) => {
    try {
      const response = await axios.get(
        `https://personal-cq8qhlkg.outsystemscloud.com/WalletAPI/rest/WalletService/getAllWalletBalance`,
        {
          params: {
            CustomerID: userId,
          },
        }
      );
      setWalletBalances(response.data);

      // Set default selected currency and balance
      if (response.data.length > 0) {
        setSelectedCurrency(response.data[0].Currency);
        setSelectedBalance(response.data[0].Balance);
      }
    } catch (error) {
      console.error('Error fetching wallet balances:', error);
    }
  };

  useEffect(() => {
    fetchWalletBalances(13); // Replace 13 with actual user ID if needed
  }, []);

  // Update displayed balance and gradient when currency is selected
  const handleCurrencyChange = (currency) => {
    setSelectedCurrency(currency);
    const selectedWallet = walletBalances.find(
      (wallet) => wallet.Currency === currency
    );
    setSelectedBalance(selectedWallet.Balance);
  };

  return (
    <Card
      className={`mb-8 bg-gradient-to-br ${
        gradientStyles[selectedCurrency] || 'from-gray-400 to-gray-600'
      } text-white border-none overflow-hidden relative`}
    >
      <div className="absolute inset-0 bg-black opacity-10 z-0"></div>
      <CardContent className="p-6 relative z-10">
        <h3 className="text-lg font-medium mb-2">Wallet Balance</h3>

        {/* Custom Select Dropdown for currency selection */}
        <Select value={selectedCurrency} onValueChange={handleCurrencyChange}>
          <SelectTrigger className="w-[120px] bg-[#282d34] border-gray-700 text-white mb-4">
            <SelectValue placeholder="Select currency" />
          </SelectTrigger>
          <SelectContent className="bg-[#282d34] border-gray-700">
            {walletBalances.map((wallet) => (
              <SelectItem
                key={wallet.Currency}
                value={wallet.Currency}
                className="text-white hover:bg-gray-700"
              >
                {wallet.Currency}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <p className="text-4xl font-bold mb-4">
          {Number(selectedBalance).toLocaleString()} {selectedCurrency}
        </p>

        <div className="flex justify-between text-sm">
          <span className="bg-white/20 px-2 py-1 rounded-full">
            +2.5% from last month
          </span>
          <Link
            to="/balance-details"
            className="text-white hover:underline flex items-center"
          >
            View Details
            <ChevronRight className="w-4 h-4 ml-1" />
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}

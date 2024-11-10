import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

import { Card, CardContent } from '../components/ui/Card';

import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/Avatar';
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
  ChevronRight,
} from 'lucide-react';

export default function Transactions() {
  const navigate = useNavigate();
  const [transactionsData, setTransactionsData] = useState([]);

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
  const fetchTransactionHistory = async (currency, startDate, endDate) => {
    try {
      // Make an Axios GET request
      const response = await axios.get(
        'https://personal-rhsh204s.outsystemscloud.com/TransactionsService/rest/TransactionHistory/GetTransactionsByCurrency',
        {
          params: {
            Currency: currency,
            StartDate: startDate,
            EndDate: endDate,
          },
          headers: {
            'X-Contacts-Key': '40aaf3c3-2372-485d-b32d-a40663685a8b',
          },
        }
      );

      // Check if response has data and return it
      if (response.status === 200) {
        console.log('Transaction History:', response.data);
        setTransactionsData(response.data); // Successfully retrieved data
      }
    } catch (error) {
      // Handle errors
      console.error('Error fetching transaction history:', error);
      throw error; // Propagate the error
    }
  };

  useEffect(() => {
    fetchTransactionHistory('SGD', '2022-01-01', '2026-01-01')
      .then((data) => {
        console.log('Fetched transactions:', data);
        // Do something with the data, e.g., set it to state or display it
      })
      .catch((error) => {
        console.error('Failed to fetch transaction history:', error);
      });
  }, []);

  return (
    <section className="mb-8">
      <h3 className="text-xl text-white font-bold mb-4">Your Transactions</h3>
      <Card className="bg-gray-800 text-white overflow-hidden">
        <CardContent className="p-0">
          {transactionsData.map((transaction) => (
            <div
              key={transaction.beneAccountId}
              className={`flex justify-between items-center p-4 border-b border-gray-700`}
            >
              <div>
                <p className="font-semibold">
                  Recipient: {transaction.nickname}
                </p>
                <p className="text-sm text-gray-400">
                  Currency: {transaction.currency}
                </p>
              </div>
              <div className="text-right">
                <p className="font-semibold">
                  -{parseFloat(transaction.total).toLocaleString()}{' '}
                  {transaction.currency}
                </p>
                <p className="text-sm text-red-400 flex items-center justify-end">
                  <ArrowUpRight className="w-3 h-3 mr-1" />
                  {/* Placeholder for growth percentage */}
                  Outgoing
                </p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </section>
  );
}

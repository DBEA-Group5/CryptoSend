import axios from 'axios';
import { useEffect, useState } from 'react';

import { Card, CardContent } from '../components/ui/Card';

import { ArrowUpRight } from 'lucide-react';

export default function Transactions() {
  const [transactionsData, setTransactionsData] = useState([]);
  const userId = localStorage.getItem('user_id');
  console.log('Logged in user ID:', userId);

  // Fetch wallet balances from API
  const fetchTransactionHistory = async (currency) => {
    try {
      // Make an Axios GET request
      const response = await axios.get(
        'https://personal-rhsh204s.outsystemscloud.com/TransactionsService/rest/TransactionHistory/GetTransactionsByCurrency',
        {
          params: {
            Currency: currency,
            user_id: userId,
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
    fetchTransactionHistory('SGD')
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

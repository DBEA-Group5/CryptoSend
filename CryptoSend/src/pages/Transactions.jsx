import axios from 'axios';
import { useEffect, useState } from 'react';
import { Card, CardContent } from '../components/ui/Card';
import { ArrowUpRight } from 'lucide-react';
import { Empty, Spin } from 'antd'; // Ant Design's Empty and Spin component for loader

// List of accepted currencies
const countryOptions = [
  { code: 'SG', label: 'SGD', flag: '🇸🇬' },
  { code: 'US', label: 'USD', flag: '🇺🇸' },
  { code: 'EU', label: 'EUR', flag: '🇪🇺' },
  { code: 'TH', label: 'THB', flag: '🇹🇭' },
  { code: 'JP', label: 'JPY', flag: '🇯🇵' },
];

export default function Transactions() {
  const [transactionsData, setTransactionsData] = useState([]);
  const [selectedCurrency, setSelectedCurrency] = useState('USD');
  const [isLoading, setIsLoading] = useState(false); // New loading state
  const userId = localStorage.getItem('user_id');
  console.log('Logged in user ID:', userId);

  // Fetch wallet balances from API
  const fetchTransactionHistory = async (currency) => {
    setIsLoading(true); // Set loading state to true when API request starts
    try {
      // Make an Axios GET request to fetch transactions
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

      // If status is 500, treat it as "No Data"
      if (response.status === 500) {
        setTransactionsData([]);
        setIsLoading(false); // Set loading state to false after request completes
        return; // No data available, return early
      }

      // Check if response has data and process it
      if (response.status === 200) {
        const transactionDataWithUsernames = await Promise.all(
          response.data.map(async (transaction) => {
            try {
              // Fetch user details for the receiving_cust_id using Axios POST request
              const userDetailResponse = await axios.get(
                `https://personal-qjduceog.outsystemscloud.com/FA/rest/users_by_api_key/get_user_detail`,
                {
                  params: { user_Id: transaction.receiving_cust_id },
                }
              );

              // If user details are fetched successfully, add the Username to the transaction
              if (userDetailResponse.status === 200) {
                return {
                  ...transaction,
                  receivingUsername: userDetailResponse.data.Username, // Add username
                };
              } else {
                console.error(
                  'Failed to fetch user details for',
                  transaction.receiving_cust_id
                );
                return transaction; // In case user detail fetch fails, return the original transaction
              }
            } catch (userError) {
              console.error('Error fetching user details:', userError);
              return transaction; // Return the original transaction if user detail fetch fails
            }
          })
        );

        setTransactionsData(transactionDataWithUsernames); // Successfully retrieved and enriched data
        setIsLoading(false); // Set loading state to false after request completes
      }
    } catch (error) {
      console.error('Error fetching transaction history:', error);
      setTransactionsData([]); // If there's an error, set empty data to prevent display
      setIsLoading(false); // Set loading state to false after error
    }
  };

  useEffect(() => {
    fetchTransactionHistory(selectedCurrency)
      .then(() => {
        console.log('Fetched and enriched transactions');
      })
      .catch((error) => {
        console.error('Failed to fetch transaction history:', error);
      });
  }, [selectedCurrency]); // Re-run whenever selectedCurrency changes

  // Handle currency change
  const handleCurrencyChange = (event) => {
    setSelectedCurrency(event.target.value); // Update currency
  };

  return (
    <section className="mb-8">
      <h3 className="text-xl text-white font-bold mb-4">
        Outgoing Transactions
      </h3>

      {/* Currency dropdown */}
      <div className="mb-4">
        <label
          htmlFor="currency"
          className="block text-white text-sm font-medium mb-2"
        >
          Select Currency
        </label>
        <select
          id="currency"
          value={selectedCurrency}
          onChange={handleCurrencyChange}
          className="bg-gray-700 text-white p-2 rounded-md w-full"
        >
          {countryOptions.map((option) => (
            <option key={option.code} value={option.label}>
              {option.flag} {option.label}
            </option>
          ))}
        </select>
      </div>

      <Card className="bg-gray-100 text-black overflow-hidden">
        <CardContent className="p-0">
          {/* Show loader while fetching data */}
          {isLoading ? (
            <div className="flex justify-center items-center py-10">
              <Spin size="large" /> {/* Ant Design loader */}
            </div>
          ) : transactionsData.length === 0 ? (
            <Empty
              description="No Data"
              className="font-bold pb-2 bg-gray-100"
            />
          ) : (
            transactionsData.map((transaction) => (
              <div
                key={transaction.Id}
                className={`flex justify-between items-center p-4 border-b border-gray-700`}
              >
                <div>
                  <p className="font-semibold">
                    From: {transaction.FromCurrency} → To:{' '}
                    {transaction.ToCurrency}
                  </p>
                  <p className="text-sm text-gray-400">
                    Date: {new Date(transaction.DateTime).toLocaleDateString()}
                  </p>
                  <p className="text-sm text-gray-400">
                    Recipient: {transaction.receivingUsername || 'Unknown'}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-semibold">
                    {parseFloat(transaction.transaction_value).toLocaleString()}{' '}
                    {transaction.FromCurrency}
                  </p>
                  <p className="text-sm text-red-400 flex items-center justify-end">
                    <ArrowUpRight className="w-3 h-3 mr-1" />
                    Outgoing
                  </p>
                </div>
              </div>
            ))
          )}
        </CardContent>
      </Card>
    </section>
  );
}

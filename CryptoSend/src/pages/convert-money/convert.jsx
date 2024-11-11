import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '../../components/ui/Avatar';
import { Button } from '../../components/ui/Button';
import { Card, CardContent } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../components/ui/Select';

const countryOptions = [
  { code: 'SG', label: 'SGD', flag: '🇸🇬' },
  { code: 'US', label: 'USD', flag: '🇺🇸' },
  { code: 'EU', label: 'EUR', flag: '🇪🇺' },
  { code: 'TH', label: 'THB', flag: '🇹🇭' },
  { code: 'JP', label: 'JPY', flag: '🇯🇵' },
];

export default function Convert() {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState('');
  const [outputValue, setOutputValue] = useState('');
  const [inputCurrency, setInputCurrency] = useState('SGD');
  const [outputCurrency, setOutputCurrency] = useState('USD');
  const [convertedCurrency, setConvertedCurrency] = useState(0);
  const [convertedCurrency2, setConvertedCurrency2] = useState(0);
  const [transactionFee, setTransactionFee] = useState(null);
  const [finalConvertAmount, setFinalConvertAmount] = useState(null);
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]); // State for users
  const [selectedRecipient, setSelectedRecipient] = useState(''); // State for selected recipient

  const fetchCurrencyConversion = async (currency, setCurrencyValue) => {
    try {
      const response = await axios.get(
        `https://personal-mkie0uyz.outsystemscloud.com/Currency_Convert/rest/ExposeAPI/GetCurrency/`,
        {
          params: { Fiat1: currency.toLowerCase() },
        }
      );

      const array_key = currency.toLowerCase();
      const conversionRate = 1 / Number(response.data[array_key]).toFixed(3);
      setCurrencyValue(conversionRate);
    } catch (error) {
      console.error('Error fetching currency conversion:', error);
      setCurrencyValue(0);
    }
  };

  // Fetch users from the API
  const fetchUsers = async () => {
    try {
      const response = await axios.get(
        `https://personal-qjduceog.outsystemscloud.com/FA/rest/users_by_api_key/get_all_user_Id_and_name`
      );
      setUsers(response.data); // Store users in state
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  useEffect(() => {
    fetchUsers(); // Fetch users when component mounts
  }, []);

  useEffect(() => {
    const fetchConversions = async () => {
      setLoading(true);
      await fetchCurrencyConversion(inputCurrency, setConvertedCurrency);
      await fetchCurrencyConversion(outputCurrency, setConvertedCurrency2);
      setLoading(false);
    };
    fetchConversions();
  }, [inputCurrency, outputCurrency]);

  useEffect(() => {
    if (inputValue) {
      setOutputValue(
        (inputValue * convertedCurrency * convertedCurrency2).toFixed(2)
      );
    }
  }, [inputValue, convertedCurrency, convertedCurrency2]);

  useEffect(() => {
    const fetchTransactionFee = async () => {
      if (!inputValue) return;

      try {
        const response = await axios.get(
          `https://personal-cq8qhlkg.outsystemscloud.com/CommissionService/rest/CommissionService/getFee`,
          {
            params: {
              Currency: inputCurrency,
              InputAmount: inputValue,
            },
          }
        );

        setTransactionFee(response.data);
      } catch (error) {
        console.error('Error fetching transaction fee:', error);
        setTransactionFee(null);
      }
    };

    fetchTransactionFee();
  }, [inputCurrency, inputValue]);

  useEffect(() => {
    // Calculate final amount only when both `inputValue` and `transactionFee` are available
    if (inputValue && transactionFee !== null) {
      setFinalConvertAmount(Number(inputValue) + Number(transactionFee));
    }
  }, [inputValue, transactionFee]);

  const handleInputChange = (e) => {
    const input = e.target.value;
    setInputValue(input);
    setLoading(true);

    setTimeout(() => {
      setOutputValue(
        (input * convertedCurrency * convertedCurrency2).toFixed(2)
      );
      setLoading(false);
    }, 1000);
  };

  const sendMoney = () => {
    console.log(finalConvertAmount);
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#0d1117]">
      <header className="flex items-center justify-between p-4 border-b border-gray-800">
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="text-gray-400 hover:text-white hover:bg-gray-800"
        >
          <ArrowLeft className="w-6 h-6" />
        </Button>
        <h1 className="text-xl font-bold text-white">Send Money</h1>
        <div className="w-6" />
      </header>

      <main className="flex-1 overflow-y-auto p-4 space-y-6">
        <Card className="bg-[#1e2329] border-gray-800">
          <CardContent className="p-4">
            <h2 className="text-lg font-semibold text-white mb-2">
              Exchange Rate
            </h2>
            <div className="space-y-1 text-gray-400">
              <p>
                1 {inputCurrency} = {convertedCurrency.toFixed(4)} USDC
              </p>
              <p>
                1 {outputCurrency} = {convertedCurrency2.toFixed(4)} USDC
              </p>
            </div>
          </CardContent>
        </Card>
        <div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              From
            </label>
            <Card className="bg-[#1e2329] border-gray-800">
              <CardContent className="p-4">
                <div className="flex items-center space-x-4 mb-4">
                  <Select
                    value={inputCurrency}
                    onValueChange={setInputCurrency}
                  >
                    <SelectTrigger className="w-[120px] bg-[#282d34] border-gray-700 text-white">
                      <SelectValue placeholder="Select currency" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#282d34] border-gray-700">
                      {countryOptions.map((option) => (
                        <SelectItem
                          key={option.label}
                          value={option.label}
                          className="text-white hover:bg-gray-700"
                        >
                          <span className="mr-2">{option.flag}</span>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Input
                    type="number"
                    placeholder="0.00"
                    value={inputValue}
                    onChange={handleInputChange}
                    className="flex-1 bg-[#282d34] border-gray-700 text-white placeholder-gray-500 focus:border-purple-500"
                  />
                </div>
                <p className="text-sm text-gray-400">
                  Available balance: 1,000.00 {inputCurrency}
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="flex justify-center mt-4">
            <ArrowRight className="w-6 h-6 text-[#8A2BE2] rotate-90 my-0 " />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              To
            </label>
            <Card className="bg-[#1e2329] border-gray-800">
              <CardContent className="p-4">
                <div className="flex items-center space-x-4 mb-4">
                  <Select
                    value={outputCurrency}
                    onValueChange={setOutputCurrency}
                  >
                    <SelectTrigger className="w-[120px] bg-[#282d34] border-gray-700 text-white">
                      <SelectValue placeholder="Select currency" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#282d34] border-gray-700">
                      {countryOptions.map((option) => (
                        <SelectItem
                          key={option.label}
                          value={option.label}
                          className="text-white hover:bg-gray-700"
                        >
                          <span className="mr-2">{option.flag}</span>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Input
                    type="number"
                    placeholder="0.00"
                    value={outputValue}
                    readOnly
                    className="flex-1 bg-[#282d34] border-gray-700 text-white placeholder-gray-500 focus:border-purple-500"
                  />
                </div>
                <Select
                  value={selectedRecipient}
                  onValueChange={(value) => setSelectedRecipient(value)} // Ensure the correct value is set
                >
                  <SelectTrigger className="bg-[#1e2329] border-gray-800 text-white">
                    <SelectValue placeholder="Select recipient" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#282d34] border-gray-700">
                    {users.map((user) => (
                      <SelectItem
                        key={user.User_Id} // Unique key for each user
                        value={user.User_Id} // Ensure each item has a unique value
                        className="text-white hover:bg-gray-700"
                      >
                        {user.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>
          </div>
        </div>
        <footer className="p-4 border-t border-gray-800">
          {transactionFee !== null && (
            <p className="text-sm text-gray-400 text-center mb-2">
              Transaction Fee: {transactionFee.toFixed(4)} {inputCurrency}
            </p>
          )}
          {finalConvertAmount !== null && (
            <p className="text-sm text-purple-400 text-center mb-2">
              Your wallet will be deducted: {finalConvertAmount.toFixed(4)}{' '}
              {inputCurrency}
            </p>
          )}{' '}
          {finalConvertAmount !== null && (
            <p className="text-sm text-purple-400 text-center mb-2">
              Your recipient will receive: {outputValue} {outputCurrency}
            </p>
          )}
          <Button
            className="w-full h-14 bg-[#8A2BE2] hover:bg-[#7B27CC] text-white font-medium text-lg"
            disabled={loading}
            onClick={sendMoney}
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <span className="animate-pulse mr-2">•••</span>
              </span>
            ) : (
              'Send Money'
            )}
          </Button>
        </footer>
        ;
      </main>
    </div>
  );
}

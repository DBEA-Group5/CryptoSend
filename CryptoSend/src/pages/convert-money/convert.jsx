import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '../../components/ui/Avatar';
import { Button } from '../../components/ui/Button';
import { Card, CardContent } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/Select';

const countryOptions = [
  { code: 'SG', label: 'SGD', flag: '🇸🇬' },
  { code: 'US', label: 'USD', flag: '🇺🇸' },
  { code: 'EU', label: 'EUR', flag: '🇪🇺' },
  { code: 'GB', label: 'GBP', flag: '🇬🇧' },
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
  const [loading, setLoading] = useState(false);

  const fetchCurrencyConversion = async (currency, setCurrencyValue) => {
    try {
      const response = await axios.get(
        `https://personal-mkie0uyz.outsystemscloud.com/Currency_Convert/rest/ExposeAPI/GetCurrency/`,
        {
          params: {
            Fiat1: currency.toLowerCase(),
          },
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
      setOutputValue((inputValue * convertedCurrency * convertedCurrency2).toFixed(2));
    }
  }, [inputValue, convertedCurrency, convertedCurrency2]);

  const handleInputChange = (e) => {
    const input = e.target.value;
    setInputValue(input);
    setLoading(true);

    setTimeout(() => {
      setOutputValue((input * convertedCurrency * convertedCurrency2).toFixed(2));
      setLoading(false);
    }, 1000);
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
            <h2 className="text-lg font-semibold text-white mb-2">Exchange Rate</h2>
            <div className="space-y-1 text-gray-400">
              <p>1 {inputCurrency} = {convertedCurrency.toFixed(4)} USDC</p>
              <p>1 {outputCurrency} = {convertedCurrency2.toFixed(4)} USDC</p>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">From</label>
            <Card className="bg-[#1e2329] border-gray-800">
              <CardContent className="p-4">
                <div className="flex items-center space-x-4 mb-4">
                  <Select value={inputCurrency} onValueChange={setInputCurrency}>
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

          <div className="flex justify-center">
            <ArrowRight className="w-6 h-6 text-[#8A2BE2]" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">To</label>
            <Card className="bg-[#1e2329] border-gray-800">
              <CardContent className="p-4">
                <div className="flex items-center space-x-4 mb-4">
                  <Select value={outputCurrency} onValueChange={setOutputCurrency}>
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
                    className="flex-1 bg-[#282d34] border-gray-700 text-white placeholder-gray-500"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Avatar className="w-8 h-8 border border-gray-700">
                    <AvatarImage src="/placeholder-user.jpg" alt="Recipient" />
                    <AvatarFallback className="bg-[#282d34] text-white">RC</AvatarFallback>
                  </Avatar>
                  <span className="text-sm text-white">Recipient Name</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <footer className="p-4 border-t border-gray-800">
        <Button 
          className="w-full h-14 bg-[#8A2BE2] hover:bg-[#7B27CC] text-white font-medium text-lg" 
          disabled={loading}
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
    </div>
  );
}
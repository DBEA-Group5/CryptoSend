import axios from 'axios';
import { ArrowLeft } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Card, CardContent } from '../components/ui/Card';
import { Input } from '../components/ui/Input';

const countryOptions = [
  { code: 'SG', label: 'SGD', flag: '🇸🇬' },
  { code: 'US', label: 'USD', flag: '🇺🇸' },
  { code: 'EU', label: 'EUR', flag: '🇪🇺' },
  { code: 'TH', label: 'THB', flag: '🇹🇭' },
  { code: 'JP', label: 'JPY', flag: '🇯🇵' },
];

export default function AddMoney() {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState('');
  const [inputCurrency, setInputCurrency] = useState('SGD');
  const [loading, setLoading] = useState(false);

  const topUpWallet = async (customerId, amount, currency) => {
    if (!amount) return;

    console.log(customerId, amount, currency);

  try {
    setLoading(true);
    const response = await axios.post(
      `https://personal-cq8qhlkg.outsystemscloud.com/WalletAPI/rest/WalletService/addFunds`,
      null, // No body content needed, as we're sending parameters in the URL
      {
        params: {
          CustomerID: customerId,
          AmountToAdd: amount,
          Currency: currency,
        },
      }
    );
    console.log('Top up successful:', response.data);
    // Handle response, e.g., navigate to success page or show success message
  } catch (error) {
    console.error(
      'Error fetching transaction fee:',
      error.response?.data || error.message
    );
    // Handle error (e.g., show error message to user)
  } finally {
    setLoading(false);
  }
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleTopUp = () => {
    topUpWallet(13, parseFloat(inputValue), inputCurrency);
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
        <h1 className="text-xl font-bold text-white">Deposit Funds</h1>
        <div className="w-6" />
      </header>

      <main className="flex-1 overflow-y-auto p-4 space-y-6">
        <Card className="bg-[#1e2329] border-gray-800">
          <CardContent className="p-4">
            <h2 className="text-lg font-semibold text-white mb-2">
              Add Money From tBank
            </h2>
            {/* <div className="space-y-1 text-gray-400">
              <p>
                1 {inputCurrency} = {'<conversion_rate>'} USDC
              </p>
            </div> */}
          </CardContent>
        </Card>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Amount to Deposit into Wallet
            </label>
            <Card className="bg-[#1e2329] border-gray-800">
              <CardContent className="p-4">
                <div className="flex items-center space-x-4 mb-4">
                  <Input
                    type="number"
                    placeholder="0.00"
                    value={inputValue}
                    onChange={handleInputChange}
                    className="flex-1 bg-[#282d34] border-gray-700 text-white placeholder-gray-500 focus:border-purple-500"
                  />
                  <select
                    value={inputCurrency}
                    onChange={(e) => setInputCurrency(e.target.value)}
                    className="bg-[#282d34] text-white border-gray-700"
                  >
                    {countryOptions.map((option) => (
                      <option key={option.code} value={option.label}>
                        {option.flag} {option.label}
                      </option>
                    ))}
                  </select>
                </div>
                <p className="text-sm text-gray-400">
                  {/* Available balance: 1,000.00 {inputCurrency} */}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <footer className="p-4 border-t border-gray-800">
        <Button
          className="w-full h-14 bg-[#8A2BE2] hover:bg-[#7B27CC] text-white font-medium text-lg"
          disabled={loading}
          onClick={handleTopUp}
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

import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import axios

import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { Select, Input, Drawer, Flex, Spin } from 'antd'; // Import Ant Design Modal

import Flag from 'react-world-flags'; // Import the Flag component

const { Option } = Select;

const countryOptions = [
  { code: 'SG', label: 'SGD' },
  { code: 'US', label: 'USD' },
  { code: 'EU', label: 'EUR' },
  { code: 'GB', label: 'GBP' },
  { code: 'JP', label: 'JPY' },
  // Add more countries as needed
];

export default function Convert({ isDrawerVisible, onClose }) {
  const [inputValue, setInputValue] = useState('');
  const [outputValue, setOutputValue] = useState('');
  const [inputCurrency, setInputCurrency] = useState('SGD');
  const [outputCurrency, setOutputCurrency] = useState('USD');
  const [convertedCurrency, setConvertedCurrency] = useState(0);
  const [convertedCurrency2, setConvertedCurrency2] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleClose = () => {
    onClose();
  };

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
      setOutputValue(inputValue * convertedCurrency * convertedCurrency2);
    }
  }, [convertedCurrency, convertedCurrency2]);

  const handleInputChange = (e) => {
    const input = e.target.value;
    setInputValue(input);
    setLoading(true);

    setTimeout(() => {
      setOutputValue(input * convertedCurrency * convertedCurrency2);
      setLoading(false);
    }, 4000);
  };

  const handleOutputChange = (e) => {
    const output = e.target.value;
    setOutputValue(output);
    setLoading(true);

    setTimeout(() => {
      setInputValue((output * convertedCurrency2) / convertedCurrency);
      setLoading(false);
    }, 4000);
  };

  return (
    <Drawer
      title="Send Money (F-C-F)"
      placement="bottom"
      closable={true}
      onClose={handleClose}
      open={isDrawerVisible}
      height={800} // Adjust height as needed
      style={{ background: '#f5f5f5' }}
    >
      <div>
        <Card className="bg-black p-4 mb-8">
          <h2 className="text-white font-bold text-2xl mb-2">Rates</h2>
          <h3 className=" text-purple-400 font-bold	">
            $1 {inputCurrency} = {convertedCurrency} USDC
          </h3>
          <h4 className=" text-purple-400 font-bold">
            $1 {outputCurrency} = {convertedCurrency2} USDC
          </h4>
        </Card>
        <h4 className="font-medium text-gray-400 mb-2">Transfer From</h4>
        <Card
          title="Card title"
          style={{
            // display: 'flex',
            marginBottom: '16px',
            padding: '16px',
            background: 'white',
            border: 'none',
          }}
        >
          <div className="flex mb-2">
            <Select
              value={inputCurrency}
              onChange={(value) => setInputCurrency(value)}
              style={{ marginRight: '8px', height: '70px' }}
            >
              {countryOptions.map((country) => (
                <Option key={country.label} value={country.label}>
                  <Flag
                    code={country.code}
                    style={{ width: '20px', marginRight: '8px' }}
                  />
                  {country.label}
                </Option>
              ))}
            </Select>
            <Input
              placeholder="Amount to convert"
              value={inputValue}
              onChange={handleInputChange}
              style={{ padding: '16px' }}
            />
          </div>
          <p className="font-bold text-blue-400">
            Current Balance: {inputCurrency}
          </p>
        </Card>{' '}
        <Flex
          gap="middle"
          vertical
          style={{ display: loading ? 'flex' : 'none' }}
        >
          <Spin spinning={loading}>
            <Card
              title="Card title"
              style={{
                display: 'flex',
                padding: '16px',
                background: 'white',
                border: 'none',
              }}
            >
              <h3 className="text-purple-700 font-bold m-auto d-block">
                Converting from {inputCurrency} to USDC
              </h3>
            </Card>
          </Spin>{' '}
          <Spin spinning={loading}>
            <Card
              title="Card title"
              style={{
                display: 'flex',
                padding: '16px',
                marginBottom: '16px',
                background: 'white',
                border: 'none',
              }}
            >
              <h3 className="text-purple-700 font-bold m-auto d-block">
                Converting from USDC to {outputCurrency}
              </h3>
            </Card>
          </Spin>
          {/* <p>
              <Switch checked={loading} onChange={setLoading} />
            </p> */}
        </Flex>
        {/* Output field with currency select */}
        <h4 className="font-medium text-gray-400 mb-2">Transfer To</h4>
        <Select className="w-full mb-2" placeholder="Select Sendee"></Select>
        <Card
          title="Card title"
          style={{
            display: 'flex',
            marginBottom: '16px',
            // marginTop: '16px',
            padding: '16px',
            background: 'white',
            border: 'none',
          }}
        >
          {' '}
          <Select
            value={outputCurrency}
            onChange={(value) => setOutputCurrency(value)}
            style={{ marginRight: '8px', height: '70px' }}
          >
            {countryOptions.map((country) => (
              <Option key={country.label} value={country.label}>
                <Flag
                  code={country.code}
                  style={{ width: '20px', marginRight: '8px' }}
                />
                {country.label}
              </Option>
            ))}
          </Select>
          <Input
            placeholder="Converted amount"
            value={outputValue}
            style={{ padding: '16px' }}
            onChange={handleOutputChange}
          />
        </Card>
      </div>

      <Button
        type="primary"
        className={
          'bg-black text-purple-400 w-full m-auto button p-6 align-center d-flex font-bold text-md mt-8'
        }
        // loading={loadings[0]}
        // onClick={() => enterLoading(0)}
      >
        Convert Money
      </Button>
    </Drawer>
  );
}

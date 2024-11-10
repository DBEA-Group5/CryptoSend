import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../components/ui/Select';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '../../components/ui/Tabs';
import { ChartContainer } from '../../components/ui/chart';
import { Loader2 } from 'lucide-react';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Charts = () => {
  const [chartData, setChartData] = useState({});
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState('7');
  const [allData, setAllData] = useState([]);
  const [currency, setCurrency] = useState('SGD');
  const [error, setError] = useState(null);

  const countryCurrencyMapping = {
    Singapore: 'SGD',
    USA: 'USD',
    Eurozone: 'EUR',
    Japan: 'JPY',
    Thailand: 'THB',
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        console.log(`Fetching data for ${currency}`);
        const response = await axios.get(
          'https://personal-mkie0uyz.outsystemscloud.com/Currency_Convert/rest/ExposeAPI/GetListCurrency',
          {
            params: {
              fiat1: currency.toLowerCase(),
            },
          }
        );

        console.log('API Response:', response.data);

        if (response.data && Array.isArray(response.data.prices)) {
          const prices = response.data.prices;
          console.log(`Received ${prices.length} price points for ${currency}`);
          setAllData(prices);
          updateChart(prices, parseInt(timeRange));
        } else {
          console.error('Invalid data format received:', response.data);
          setError(`Invalid data format received for ${currency}`);
          setAllData([]);
          setChartData({
            labels: [],
            datasets: [],
          });
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(`Error fetching data for ${currency}: ${error.message}`);
        setAllData([]);
        setChartData({
          labels: [],
          datasets: [],
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [currency, timeRange]);

  const updateChart = (data, range) => {
    console.log(
      `Updating chart with ${data.length} data points for ${range} days`
    );
    if (!Array.isArray(data) || data.length === 0) {
      console.error('No valid data to update chart');
      setChartData({
        labels: [],
        datasets: [],
      });
      return;
    }

    const filteredData = data.slice(-range);
    const days = filteredData.map((price) => {
      const date = new Date(price.__singleArrayAttribute[0]);
      return `${date.getDate().toString().padStart(2, '0')}/${(
        date.getMonth() + 1
      )
        .toString()
        .padStart(2, '0')}`;
    });
    const values = filteredData.map((price) => price.__singleArrayAttribute[1]);

    console.log('Processed data:', { days, values });

    const minValue = Math.min(...values) * 0.9999;
    const maxValue = Math.max(...values) * 1.0001;

    setChartData({
      labels: days,
      datasets: [
        {
          label: `USDC to ${currency} Price`,
          data: values,
          borderColor: 'rgba(138, 43, 226, 1)',
          backgroundColor: 'rgba(138, 43, 226, 0.2)',
          fill: true,
          tension: 0.1,
          pointRadius: 3,
          pointHoverRadius: 5,
        },
      ],
    });
  };

  const handleTabChange = (value) => {
    setTimeRange(value);
    updateChart(allData, parseInt(value));
  };

  return (
    <div className="bg-[#1e2329] rounded-lg p-4 w-full max-w-md">
      <h2 className="text-xl text-white font-bold mb-4">
        Cryptocurrency Prices
      </h2>

      <div className="space-y-4">
        <Select value={currency} onValueChange={setCurrency}>
          <SelectTrigger className="w-full bg-[#282d34] border-gray-700 text-white">
            <SelectValue placeholder="Select currency" />
          </SelectTrigger>
          <SelectContent className="bg-[#282d34] border-gray-700">
            {Object.entries(countryCurrencyMapping).map(([country, curr]) => (
              <SelectItem
                key={curr}
                value={curr}
                className="text-white hover:bg-gray-700"
              >
                {country} ({curr})
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Tabs
          value={timeRange}
          onValueChange={handleTabChange}
          className="w-full"
        >
          <TabsList className="bg-[#282d34] border-gray-700 p-1 w-full grid grid-cols-3">
            <TabsTrigger
              value="120"
              className="text-xs text-gray-300 data-[state=active]:bg-purple-600 data-[state=active]:text-white"
            >
              120 Days
            </TabsTrigger>
            <TabsTrigger
              value="30"
              className="text-xs text-gray-300 data-[state=active]:bg-purple-600 data-[state=active]:text-white"
            >
              30 Days
            </TabsTrigger>
            <TabsTrigger
              value="7"
              className="text-xs text-gray-300 data-[state=active]:bg-purple-600 data-[state=active]:text-white"
            >
              7 Days
            </TabsTrigger>
          </TabsList>
        </Tabs>

        {loading ? (
          <div className="flex justify-center items-center h-[200px]">
            <Loader2 className="h-8 w-8 animate-spin text-purple-600" />
          </div>
        ) : error ? (
          <div className="text-red-500 text-center h-[200px] flex items-center justify-center">
            {error}
          </div>
        ) : (
          <ChartContainer className="h-[200px] w-full">
            <Line
              data={chartData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    display: true,
                    position: 'top',
                    align: 'start',
                    labels: {
                      color: 'white',
                      boxWidth: 12,
                      padding: 8,
                      font: { size: 10 },
                    },
                  },
                  title: {
                    display: true,
                    text: `Cryptocurrency Price Trend (Last ${timeRange} Days)`,
                    color: 'white',
                    padding: { bottom: 10 },
                    font: { size: 12 },
                  },
                },
                scales: {
                  x: {
                    grid: {
                      color: 'rgba(255, 255, 255, 0.1)',
                      drawBorder: false,
                    },
                    ticks: {
                      color: 'white',
                      font: { size: 9 },
                      maxRotation: 0,
                      autoSkip: true,
                      maxTicksLimit: 7,
                    },
                  },
                  y: {
                    position: 'left',
                    grid: {
                      color: 'rgba(255, 255, 255, 0.1)',
                      drawBorder: false,
                    },
                    ticks: {
                      color: 'white',
                      font: { size: 9 },
                      padding: 4,
                      callback: function (value) {
                        return value.toFixed(3);
                      },
                    },
                  },
                },
                interaction: {
                  mode: 'index',
                  intersect: false,
                },
                elements: {
                  point: {
                    radius: 2,
                    hoverRadius: 4,
                  },
                },
              }}
            />
          </ChartContainer>
        )}
      </div>
    </div>
  );
};

export default Charts;

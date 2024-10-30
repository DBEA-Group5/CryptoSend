// Charts.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import { Tabs, Spin, Card, Select } from 'antd'; // Import Ant Design Select for dropdown

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

// Register chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
const { TabPane } = Tabs;
const { Option } = Select; // Extract Option from Select

const Charts = () => {
  const [chartData, setChartData] = useState({});
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState(7); // Default to 7 days
  const [allData, setAllData] = useState([]);
  const [currency, setCurrency] = useState('SGD'); // Default currency

  // Define a mapping of country names to their corresponding currency codes
  const countryCurrencyMapping = {
    USA: 'USD',
    Singapore: 'SGD',
    Eurozone: 'EUR',
    Japan: 'JPY',
    Australia: 'AUD',
    // Add more countries and currencies as needed
  };

  // Fetch data from API whenever currency changes
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          'https://personal-mkie0uyz.outsystemscloud.com/Currency_Convert/rest/ExposeAPI/GetListCurrency',
          {
            params: {
              fiat1: currency,
            },
          }
        );
        const prices = response.data.prices;
        setAllData(prices); // Store full data for future filtering
        updateChart(prices, timeRange); // Update chart with new data
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [currency, timeRange]); // Fetch data when currency or time range changes

  // Function to update the chart based on time range
  const updateChart = (data, range) => {
    const filteredData = data.slice(-range); // Filter the last N days
    const days = filteredData.map((price) =>
      new Date(price.__singleArrayAttribute[0]).toLocaleDateString('en-GB')
    );
    const values = filteredData.map((price) => price.__singleArrayAttribute[1]);

    setChartData({
      labels: days,
      datasets: [
        {
          label: `USDC to ${currency} Price Over Last ${range} Days`,
          data: values,
          borderColor: 'rgba(75, 192, 192, 1)',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          fill: true,
          tension: 0.1,
        },
      ],
    });
  };

  // Handle tab change to filter data
  const handleTabChange = (key) => {
    setTimeRange(parseInt(key));
    updateChart(allData, parseInt(key));
  };

  return (
    <div>
      <h2 className="text-xl text-white font-bold mb-4">
        Cryptocurrency Prices
      </h2>

      <Card>
        {/* Dropdown for country selection */}
        <Select
          defaultValue="SGD"
          style={{ width: 120, marginBottom: 16 }}
          onChange={(value) => setCurrency(value)}
        >
          {Object.entries(countryCurrencyMapping).map(([country, currency]) => (
            <Option key={currency} value={currency}>
              {country} ({currency})
            </Option>
          ))}
        </Select>

        <Tabs
          style={{ background: 'white', borderRadius: '10px' }}
          defaultActiveKey="7"
          onChange={handleTabChange}
        >
          <TabPane
            style={{ background: 'white' }}
            tab="120 Days"
            key="120"
          ></TabPane>
          <TabPane tab="30 Days" key="30"></TabPane>
          <TabPane tab="7 Days" key="7"></TabPane>
        </Tabs>

        {loading ? (
          <Spin tip="Loading chart data..." />
        ) : (
          <Line
            data={chartData}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  position: 'top',
                },
                title: {
                  display: true,
                  text: `Cryptocurrency Price Trend (Last ${timeRange} Days)`,
                },
              },
              scales: {
                x: {
                  title: {
                    display: true,
                    text: 'Date',
                  },
                },
                y: {
                  title: {
                    display: true,
                    text: 'Price (in SGD)',
                  },
                  ticks: {
                    stepSize: 0.01,
                    autoSkip: false,
                    callback: function (value) {
                      return value.toFixed(2); // Format as 1.3++
                    },
                  },
                  beginAtZero: false,
                  min: 1.27,
                  max: 1.37,
                },
              },
            }}
            height={300}
          />
        )}
      </Card>
    </div>
  );
};

export default Charts;
